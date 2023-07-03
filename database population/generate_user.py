from faker import Faker
import random

fake = Faker()

def brNumber():
    ddd = random.randint(10, 99)
    prefix = random.randint(10000, 99999)
    suffix = random.randint(1000, 9999)
    return f"({ddd}) {prefix}-{suffix}"

# Geração do arquivo insert_users.sql
sql_file_users = open('insert_users.sql', 'w')

# Instrução SQL INSERT para usuários
insert_sql_users = 'INSERT INTO "Users" (username, password, email, name, number, image_path, profile, is_suspended, "createdAt", "updatedAt")\nVALUES\n'

sql_file_users.write(insert_sql_users)
num_users = 200
num_courses = 20
users_per_course = num_users // num_courses

# Geração do arquivo insert_registrations.sql
sql_file_registrations = open('insert.sql', 'w')

# Instrução SQL INSERT para matrículas
insert_sql_registrations = 'INSERT INTO "Registrations" ("User_id", "Course_id", progress_time,"createdAt", "updatedAt")\nVALUES\n'

sql_file_registrations.write(insert_sql_registrations)

for i in range(num_users):
    username = fake.user_name()
    password = fake.password()
    email = fake.email()
    name = fake.name()
    number = str(brNumber())
    image_path = fake.file_path()
    profile = "student"
    is_suspended = fake.boolean()
    created_at = fake.date_time_between(start_date='-1y', end_date='now')
    updated_at = fake.date_time_between(start_date=created_at, end_date='now')

    # Dados dos usuários fictícios
    values = f"('{username}', '{password}', '{email}', '{name}', '{number}', '{image_path}', '{profile}', {is_suspended}, '{created_at}', '{updated_at}')"

    # Escreve os dados no arquivo insert_users.sql
    sql_file_users.write(values)

    # Adiciona nova linha após cada conjunto completo de dados
    if i < num_users - 1:
        sql_file_users.write(',\n')

    # Calcula o ID do curso com base no índice
    course_id = (i % num_courses) + 1

    # Gera os valores da matrícula
    progress_time = random.randint(0, 100)

    registration_values = f"({i+1}, {course_id}, {progress_time},'{created_at}', '{updated_at}')"
    sql_file_registrations.write(registration_values)

    # Adiciona nova linha após cada conjunto completo de dados
    if i < num_users - 1:
        sql_file_registrations.write(',\n')

sql_file_users.write(';\n')
sql_file_users.close()

sql_file_registrations.write(';\n')
sql_file_registrations.close()
