import fastify from 'fastify';
import { request } from 'http';

export default function createApp(options = {}) {
  const app = fastify(options);

  type GetHelloRoute = {
    Querystring: { name: string };
  };

  app.get<GetHelloRoute>('/api/hello', (request, reply) => {
    const { name } = request.query;
    reply.send({ hello: 'World!' });
  });

  app.get('/api/good-bye', (request, reply) => {
    reply.send({ message: 'Good Bye Visitor!' }).code(200);
  });

  type PostBeverageResponse = {
    Params: PostBeverageTypes;
    Querystring: PostBeverageQuery;
    Body: PostBeverageBody;
  };

  type PostBeverageTypes = {
    type: 'chai' | 'tea' | 'coffee';
  };

  type PostBeverageQuery = {
    milk?: 'yes' | 'no';
    sugar?: 'yes' | 'no';
  };

  type PostBeverageBody = {
    kind?: string;
  };

  app.post<PostBeverageResponse>('/api/beverages/:type', (request, reply) => {
    const { type } = request.params;
    const { milk, sugar } = request.query;
    const { kind } = request.body;
    const result = kind ? `${kind} ${type}` : type;

    const options: string[] = [];

    if (milk === 'yes') {
      options.push('milk');
    }

    if (sugar === 'yes') {
      options.push('sugar');
    }

    reply.status(200).send({ drink: result, with: options });
  });

  return app;
}

// task 7 and task 8 homework
