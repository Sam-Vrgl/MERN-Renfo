const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Contact Manager API',
    version: '1.0.0',
    description: 'API documentation for the MERN Contact Manager application',
  },
  servers: [
    {
      url: '/api/v1',
      description: 'Development server',
    },
  ],
  tags: [
    { name: 'Authentication', description: 'User registration and login' },
    { name: 'Contacts', description: 'Contact management endpoints' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 10 },
          role: { type: 'string', enum: ['user', 'admin'], readOnly: true },
        },
        required: ['email', 'password'],
      },
      Address: {
        type: 'object',
        properties: {
            street: { type: 'string', example: '123 Main St' },
            city: { type: 'string', example: 'Anytown' },
            state: { type: 'string', example: 'CA' },
            zipCode: { type: 'string', example: '12345' },
            country: { type: 'string', example: 'USA' },
        }
      },
      Contact: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Contact ID' },
          user: { type: 'string', description: 'Owning user ID' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          phone: { type: 'string' },
          email: { type: 'string', format: 'email' },
          address: { $ref: '#/components/schemas/Address' },
        },
        required: ['firstName', 'lastName', 'phone'],
      },
      ContactInput: {
        type: 'object',
        properties: {
          firstName: { type: 'string', example: 'Jane' },
          lastName: { type: 'string', example: 'Doe' },
          phone: { type: 'string', example: '+1234567890' },
          email: { type: 'string', format: 'email', example: 'jane.doe@example.com' },
          address: { $ref: '#/components/schemas/Address' },
        },
        required: ['firstName', 'lastName', 'phone'],
      },
    },
  },
  paths: {
    '/auth/register': {
      post: {
        tags: ['Authentication'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' },
            },
          },
        },
        responses: {
          '201': { description: 'User registered successfully.' },
          '400': { description: 'Validation error or missing fields.' },
          '409': { description: 'Email already exists.' },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Authenticate user and get token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { 
                      token: { type: 'string' }, 
                      userId: { type: 'string' },
                      role: { type: 'string' },
                   },
                },
              },
            },
          },
          '401': { description: 'Invalid credentials' },
        },
      },
    },
    '/contacts': {
      get: {
        tags: ['Contacts'],
        summary: 'Get all contacts for authenticated user',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'List of contacts',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Contact' } },
              },
            },
          },
          '401': { description: 'Not authorized' },
        },
      },
      post: {
        tags: ['Contacts'],
        summary: 'Create a new contact',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ContactInput' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Contact created',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Contact' } } },
          },
          '400': { description: 'Validation error' },
          '401': { description: 'Not authorized' },
        },
      },
    },
    '/contacts/{id}': {
      patch: {
        tags: ['Contacts'],
        summary: 'Update a contact by ID',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ContactInput' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Contact updated',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Contact' } } },
          },
          '401': { description: 'Not authorized' },
          '403': { description: 'Forbidden to update this contact' },
          '404': { description: 'Contact not found' },
        },
      },
      delete: {
        tags: ['Contacts'],
        summary: 'Delete a contact by ID',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': { description: 'Contact deleted successfully.' },
          '401': { description: 'Not authorized' },
          '403': { description: 'Forbidden to delete this contact' },
          '404': { description: 'Contact not found' },
        },
      },
    },
  },
};

module.exports = swaggerDefinition;
