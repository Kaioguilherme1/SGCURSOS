const {Category} = require('../models/index');
const {Op} = require("sequelize");
const TokenController = require("../middleware/AuthToken");
const {hasPermissionAdmin, hasPermissionUser} = require("../middleware/roles");
const {requestLogger} = require("../config/logger");


async function create(token, data) {
    const {name, description} = data;
    if (await hasPermissionAdmin(token)) {
        try{
            const category = await Category.create({
                name: name,
                description: description
            });
            requestLogger.info("Categoria criada com sucesso!");
            return {
                error: false,
                message: "Categoria criada com sucesso!",
                category: category
            }
        } catch (error) {
            requestLogger.error(error);
            return {
                error: true,
                message: "Erro ao criar categoria!"
            }
        }
    }else{
        return {
            error: true,
            message: "Você não tem permissão para criar uma categoria!"
        }
    }
}

async function get(data){
    const {all, id, name} = data;
    const whereClause = all
      ? {} // Se "all" for true, não aplicamos nenhum filtro
      : {
          [Op.and]: [
            id ? { id } : {},
            name ? { name } : {},
          ]
        };
    try{
        const categories = await Category.findAll({
            where: whereClause
        });
        requestLogger.info("Categorias encontradas com sucesso!");
        return {
            error: false,
            message: "Categorias encontradas com sucesso!",
            categories: categories
        }
    } catch (error) {
        requestLogger.error(error);
        return {
            error: true,
            message: "Erro ao retornar categorias!"
        }
    }
}

async function deleteCategory(id) {
    if (await hasPermissionAdmin(token)) {
        try{
            const category = await Category.destroy({
                where: {
                    id: id
                }
            });
            requestLogger.info("Categoria deletada com sucesso!");
            return {
                error: false,
                message: "Categoria deletada com sucesso!",
                category: category
            }
        } catch (error) {
            requestLogger.error(error);
            return {
                error: true,
                message: "Erro ao deletar categoria!"
            }
        }
    }else{
        return {
            error: true,
            message: "Você não tem permissão para deletar uma categoria!"
        }
    }
}

async function updateCategory(token, id, data){
    if (await hasPermissionAdmin(token)) {
        try{
            const category = await Category.update(data, {
                where: {
                    id: id
                }
            });
            requestLogger.info("Categoria atualizada com sucesso!");
            return {
                error: false,
                message: "Categoria atualizada com sucesso!",
                category: category
            }
        } catch (error) {
            requestLogger.error(error);
            return {
                error: true,
                message: "Erro ao atualizar categoria!"
            }
        }
    }
}

module.exports = {
    create,
    get,
    deleteCategory,
    updateCategory
}