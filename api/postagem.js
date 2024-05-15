const PostController = require('../controllers/postagem');


class PostApi {
    async criarPostagem(req, res) {
       
        const titulo = req.body.titulo;
        const conteudo = req.body.conteudo;
        const autorID = req.body.autorID;

        try {
            const postagem = await PostController.criarPostagem(titulo, conteudo, autorID);
            // Enviar uma mensagem para a fila do Service Bus
            
            return res.status(201).send(postagem);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async alterarPostagem(req, res) {
        const { id } = req.params;
        const { titulo, conteudo, autorId } = req.body;
       

        try {
            const postagem = await PostController.alterarPostagem(Number(id), titulo, conteudo, autorId);
            return res.status(200).send(postagem);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

async deletarPostagem(req, res) {
    const { id } = req.params;

    try {
        await PostController.deletarPostagem(Number(id));
        return res.status(200).send({ message: "Deletado com sucesso!" });
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}


    // API
    async listarPostagens(req, res) {
        const autorID = req.params.id;

        try {
            const postagens = await PostController.listarPostagens(autorID);
            return res.status(200).send(postagens);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }


    async obterPostagemPorId(req, res) {
        const { id } = req.params;
        

        try {
            const postagem = await PostController.obterPostagemPorId(Number(id));
            return res.status(200).send(postagem);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = new PostApi();
