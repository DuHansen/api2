const User = require('../models/usuario');
const Postagem = require('../models/postagem');

class UserController {
    async criarUsuario(nome, email, senha) {
        if (!nome || !email || !senha) {
            throw new Error('Nome, email e senha são obrigatórios');
        }

        const user = await User.create({ nome, email, senha});

        return user;
    }

    async alterarUsuario(id, nome, email, senha) {
        if (!id || !nome || !email || !senha) {
            throw new Error('Id, nome, email e senha são obrigatórios');
        }

        const user = await this.buscarPorId(id);

        user.nome = nome;
        user.email = email;
        user.senha = await bcrypt.hash(senha, saltRounds);
        await user.save();

        return user;
    }

    async deletarUsuario(id) {
        if (!id) {
            throw new Error('Id é obrigatório');
        }

        const user = await this.obterUsuarioPorId(id);
        await user.destroy();
    }

    async listarUsuarios() {
        return User.findAll();
    }

    async obterUsuarioPorId(id) {
        if (!id) {
            throw new Error('Id é obrigatório');
        }

        const user = await User.findByPk(id);

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return user;
    }


async logarUsuario(email, senha){
    if(!email || !senha){
        throw new Error('Email e senha são obrigatórios');
    }
    const user = await User.findOne({ where: { email: email , senha: senha} });
    if(!user){
        throw new Error('Usuário não encontrado');
    }
    return user; 
}


    async obterPostagensPorAutorId(autorID) {
        
            if (!autorID) {
                throw new Error('autorID é obrigatório');
            }
    
            const postagens = await Postagem.findAll({ 
                where: {
                    autorID: autorID
                }
                /* Para incluir o autor da postagem no json
                ,
                include: [{ model: User, as: 'autor' }]
                */
            });
    
            if (!postagens) {
                throw new Error('Postagens não encontradas para este autorID');
            }
    
            return postagens;
        
    }
}

module.exports = new UserController();