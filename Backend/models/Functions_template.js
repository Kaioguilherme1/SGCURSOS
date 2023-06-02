// define as funções intermas do banco de dados
const sql = `
      -- Função para retornar informações do usuário
      
      CREATE OR REPLACE FUNCTION get_user_info()
        RETURNS TABLE (user_name VARCHAR(100), created_date DATE, created_time TIME)
      AS $$
      BEGIN
        RETURN QUERY
          SELECT name AS user_name, "createdAt"::date, "createdAt"::time
          FROM "Users";
      END;
      $$ LANGUAGE plpgsql;
      
      -- Função para retornar informações do curso
      CREATE OR REPLACE FUNCTION get_User_Registers_ByName(userName text)
      RETURNS TABLE (
        nome character varying(100),
        registration_id integer,
        course_name character varying(100),
        category_name character varying(100),
        category_description character varying(100)
      )
      AS $$
      BEGIN
        RETURN QUERY
        SELECT
          UT.name AS nome,
          R.id AS registration_id,
          C.name AS course_name,
          CT.name AS category_name,
          CT.description AS category_description
        FROM
          "Users" AS UT
          INNER JOIN "Registrations" R ON UT.id = R."User_id"
          INNER JOIN "Courses" C ON R."Course_id" = C.id
          INNER JOIN "Categories" CT ON C.categories_id = CT.id
        WHERE
          UT.name = get_User_Registers_ByName.userName;
      END;
      $$ LANGUAGE plpgsql;
    `;

module.exports = {sql}