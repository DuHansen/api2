const Post = require('../models/postagem');

class PostController {
    async criarPostagem(titulo, conteudo, autorID) {
        if (!titulo || !conteudo || !autorID) {
            throw new Error('Título, conteúdo e autorId são obrigatórios');
        }

        const post = await Post.create({ titulo, conteudo, autorID });

        return post;
    }

    async alterarPostagem(id, titulo, conteudo, autorID) {
        if (!id || !titulo || !conteudo || !autorID) {
            throw new Error('Id, título, conteúdo e autorId são obrigatórios');
        }

        const post = await this.obterPostagemPorId(id);

        post.titulo = titulo;
        post.conteudo = conteudo;
        post.autorID = autorID;
        await post.save();

        return post;
    }

    async deletarPostagem(id) {
        if (!id) {
            throw new Error('Id é obrigatório');
        }

        const post = await this.obterPostagemPorId(id);
        await post.destroy();
    }

    
        async listarPostagens(autorID) {
            return Post.findAll({ where: { autorID: autorID } });
        }


    async obterPostagemPorId(id) {
        if (!id) {
            throw new Error('Id é obrigatório');
        }

        const post = await Post.findByPk(id);

        if (!post) {
            throw new Error('Postagem não encontrada');
        }

        return post;
    }
}

module.exports = new PostController();
