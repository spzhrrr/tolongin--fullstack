"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const roles_guard_1 = require("./common/guards/roles.guard");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Bootstrap');
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
        crossOriginResourcePolicy: { policy: 'cross-origin' },
    }));
    app.use((0, cookie_parser_1.default)());
    app.enableCors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-Requested-With',
            'Accept',
            'Origin',
        ],
        exposedHeaders: ['Authorization'],
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: false,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.useGlobalFilters(new http_exception_filter_1.GlobalExceptionFilter());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
    const reflector = app.get(core_1.Reflector);
    app.useGlobalGuards(new jwt_auth_guard_1.JwtAuthGuard(reflector), new roles_guard_1.RolesGuard(reflector));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Tolongin API')
        .setDescription('Marketplace jasa & pekerjaan Indonesia — REST + WebSocket API')
        .setVersion('2.0.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'jwt')
        .addTag('Auth', 'Registration, login, refresh, logout & password reset')
        .addTag('Users', 'Public user profiles & seller info')
        .addTag('Categories', 'Service & job categories')
        .addTag('Services', 'Marketplace service listings')
        .addTag('Jobs', 'Job postings from buyers')
        .addTag('Applications', 'Seller applications to jobs')
        .addTag('Orders', 'Order lifecycle & state machine')
        .addTag('Reviews', 'Service & seller reviews')
        .addTag('Payments', 'Order payments & webhooks')
        .addTag('Withdrawals', 'Seller withdrawals & bank accounts')
        .addTag('Chat', 'Real-time chat (REST + WebSocket)')
        .addTag('Notifications', 'User notifications')
        .addTag('Disputes', 'Order disputes')
        .addTag('Admin', 'Admin dashboard & management')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: { persistAuthorization: true },
    });
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8001;
    await app.listen(port, '0.0.0.0');
    logger.log(`✅ Tolongin backend is running!`);
    logger.log(`📍 API: http://localhost:${port}/api`);
    logger.log(`📚 Swagger UI: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map