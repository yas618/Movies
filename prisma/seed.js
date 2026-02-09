import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Iniciando seed...');

    await prisma.movie.createMany({
        data: [
            {
                title: 'Rapunzel',
                description:
                    'Princesa de cabelos mágicos que sonha em conhecer o mundo fora da torre.',
                genre: 'Animação',
                duration: 100,
                rating: 8.0,
                available: true,
            },
            {
                title: 'Cinderela',
                description:
                    'Uma jovem sonhadora tem sua vida transformada com a ajuda da fada madrinha.',
                genre: 'Romance',
                duration: 105,
                rating: 7.5,
                available: true,
            },
            {
                title: 'Caramelo',
                description: 'Um cachorro caramelo conquista uma família e muda a vida de todos.',
                genre: 'Comédia',
                duration: 95,
                rating: 7.2,
                available: true,
            },
            {
                title: 'As Branquelas',
                description: 'Dois agentes se disfarçam para proteger herdeiras de uma ameaça.',
                genre: 'Comédia',
                duration: 109,
                rating: 6.9,
                available: true,
            },
            {
                title: 'Gente Grande',
                description:
                    'Amigos de infância se reencontram para um fim de semana cheio de confusões.',
                genre: 'Comédia',
                duration: 102,
                rating: 6.0,
                available: true,
            },
            {
                title: 'Minions',
                description: 'Criaturas amarelas vivem aventuras hilárias em busca de um vilão.',
                genre: 'Animação',
                duration: 91,
                rating: 7.4,
                available: true,
            },
            {
                title: 'Toy Story',
                description: 'Brinquedos ganham vida quando os humanos não estão por perto.',
                genre: 'Animação',
                duration: 81,
                rating: 8.3,
                available: true,
            },
            {
                title: 'Interestelar',
                description: 'Astronautas viajam pelo espaço para salvar o futuro da humanidade.',
                genre: 'Ficção Científica',
                duration: 169,
                rating: 8.6,
                available: true,
            },
            {
                title: 'Invocação do Mal',
                description: 'Investigadores paranormais enfrentam uma presença maligna.',
                genre: 'Terror',
                duration: 112,
                rating: 7.5,
                available: true,
            },
            {
                title: 'Ilha do Medo',
                description: 'Um detetive investiga o desaparecimento em um hospital psiquiátrico.',
                genre: 'Suspense',
                duration: 138,
                rating: 8.2,
                available: true,
            },
        ],
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
