import moongose from 'mongoose'

export default async function connectMongo(mongoSrv: string) {
    try {
        await moongose.connect(mongoSrv)
        console.log(`[profile-api] [database] - conexão estabelecida`)
    } catch(e: any) {
        console.log(`[profile-api] [database-error] ocorreu um problema ao tentar conectar-se a database: ${e.message}`)
    }
}