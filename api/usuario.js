const UserController = require('../controllers/usuario');


class UserApi {
    async criarUsuario(req, res) {
        const nome = req.body.nome
        const email = req.body.email;
        const senha = req.body.senha;

        try {
            const usuario = await UserController.criarUsuario(nome, email, senha);
            
            return res.status(201).send(usuario);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async alterarUsuario(req, res) {
        const { id } = req.params;
        const { nome, email, senha } = req.body;
       

        try {
            await UserController.alterarUsuario(Number(id), nome, email, senha);
            return res.status(200).send({ message: "Usuario adicionado com sucesso!" });
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async deletarUsuario(req, res) {
        const { id } = req.params;
        

        try {
            await UserController.deletarUsuario(Number(id));
            return res.status(200).send({ message: "Usuario adicionado com sucesso!" });
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async listarUsuarios(req, res) {
       

        try {
            const users = await UserController.listarUsuarios();
            return res.status(200).send(users);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async obterUsuarioPorId(req, res) {
        const { id } = req.params;
        

        try {
            const usuario = await UserController.obterUsuarioPorId(Number(id));
            return res.status(200).send(usuario);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async logarUsuario(req, res){
        const { email, senha } = req.body

        try{
            const usuario = await UserController.logarUsuario(email, senha);
            return res.status(200).send({ id: usuario.id });
        }catch(error){
            return res.status(400).send({error: error.message})
        }
    }

    async obterPostagensPorAutorId(req, res) {
        const { id: autorID } = req.params;
    
        try {
            const postagens = await UserController.obterPostagensPorAutorId(Number(autorID));
            return res.status(200).send(postagens);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }
}

module.exports = new UserApi();
