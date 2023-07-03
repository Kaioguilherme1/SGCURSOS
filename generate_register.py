from faker import Faker
import random

fake = Faker()

# Geração do arquivo insert_registrations.sql
sql_file_registrations = open('insert_registrations.sql', 'w')

# Instrução SQL INSERT para matrículas
insert_sql_registrations = 'INSERT INTO "Registrations" ("User_id", "Course_id", final_grade, progress_time,"createdAt", "updatedAt")\nVALUES\n'

sql_file_registrations.write(insert_sql_registrations)

num_users = 100
num_courses = 20
users_per_course = 10

def generate_grade(progress_time):
    if progress_time > 90:
        return random.randint(0, 100)
    else:
        return 'NULL'

# Lista de usuários
users = list(range(1, num_users + 1))

for i in range(num_courses):
    course_id = i + 1

    # Embaralha a lista de usuários
    random.shuffle(users)

    # Seleciona os primeiros 10 usuários para o curso atual
    selected_users = users[:users_per_course]

    for user_id in selected_users:
        progress_time = random.randint(0, 100)
        created_at = fake.date_time_between(start_date='-1y', end_date='now')
        updated_at = fake.date_time_between(start_date=created_at, end_date='now')
        final_grade = generate_grade(progress_time)

        values = f"  ({user_id}, {course_id}, {final_grade}, {progress_time}, '{created_at}', '{updated_at}')"
        sql_file_registrations.write(values)

        # Adiciona nova linha após cada conjunto completo de dados

        sql_file_registrations.write(',\n')

sql_file_registrations.write(';\n')
sql_file_registrations.close()
