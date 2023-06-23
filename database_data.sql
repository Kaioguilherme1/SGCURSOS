 
INSERT INTO "Categories" (name, description, "createdAt", "updatedAt")
VALUES
  ('Desenvolvimento Web', 'Aprenda a desenvolver aplicativos e sites para a web.', NOW(), NOW()),
  ('Ciência de Dados', 'Explore técnicas e ferramentas para análise e interpretação de dados.', NOW(), NOW()),
  ('Segurança da Informação', 'Aprenda a proteger sistemas e dados contra ameaças e vulnerabilidades.', NOW(), NOW()),
  ('Inteligência Artificial', 'Descubra os fundamentos e aplicações da inteligência artificial.', NOW(), NOW()),
  ('Redes de Computadores', 'Explore os princípios e protocolos de redes de computadores.', NOW(), NOW()),
  ('Desenvolvimento Mobile', 'Aprenda a criar aplicativos para dispositivos móveis.', NOW(), NOW()),
  ('Big Data', 'Descubra como lidar com grandes volumes de dados e extrair informações relevantes.', NOW(), NOW()),
  ('Cloud Computing', 'Explore os conceitos e serviços de computação em nuvem.', NOW(), NOW()),
  ('Blockchain', 'Aprenda sobre a tecnologia de blockchain e suas aplicações.', NOW(), NOW()),
  ('Internet das Coisas', 'Explore a interconexão de dispositivos e a automação de tarefas.', NOW(), NOW());


INSERT INTO "Courses" (name, description, tags, participants, categories_id, start_date, duration_hours, lessons, banner, "createdAt", "updatedAt")
VALUES
  -- Curso 1
  ('Introdução ao Desenvolvimento Web', 'Aprenda os conceitos fundamentais de desenvolvimento web e crie seu primeiro site.', ARRAY['desenvolvimento', 'web'], ARRAY[1, 2, 3], 1, '2023-07-01', 40, ARRAY['HTML', 'CSS', 'JavaScript'], 'banner_curso1.jpg', NOW(), NOW()),
  -- Curso 2
  ('Análise de Dados com Python', 'Aprenda a utilizar Python para análise e visualização de dados.', ARRAY['análise', 'dados', 'Python'], ARRAY[4, 5], 2, '2023-08-15', 30, ARRAY['Pandas', 'NumPy', 'Matplotlib'], 'banner_curso2.jpg', NOW(), NOW()),
  -- Curso 3
  ('Segurança de Redes', 'Aprenda sobre os princípios e práticas de segurança de redes.', ARRAY['segurança', 'redes'], ARRAY[6, 7, 8], 3, '2023-09-10', 50, ARRAY['Firewalls', 'Criptografia', 'Testes de penetração'], 'banner_curso3.jpg', NOW(), NOW()),
  -- Curso 4
  ('Introdução à Inteligência Artificial', 'Descubra os conceitos básicos e aplicações da inteligência artificial.', ARRAY['inteligência', 'artificial'], ARRAY[9, 10], 4, '2023-10-20', 40, ARRAY['Aprendizado de Máquina', 'Redes Neurais', 'Processamento de Linguagem Natural'], 'banner_curso4.jpg', NOW(), NOW()),
  -- Curso 5
  ('Desenvolvimento de Aplicações Mobile', 'Aprenda a criar aplicativos para dispositivos móveis utilizando frameworks populares.', ARRAY['desenvolvimento', 'mobile'], ARRAY[11, 12, 13], 5, '2023-11-05', 60, ARRAY['React Native', 'Flutter', 'Ionic'], 'banner_curso5.jpg', NOW(), NOW()),
  -- Curso 6
  ('Big Data e Análise de Dados', 'Explore técnicas e ferramentas para lidar com grandes volumes de dados e obter insights valiosos.', ARRAY['big', 'data', 'análise', 'dados'], ARRAY[14, 15], 6, '2023-12-12', 50, ARRAY['Hadoop', 'Spark', 'SQL'], 'banner_curso6.jpg', NOW(), NOW()),
  -- Curso 7
  ('Administração de Sistemas Linux', 'Aprenda a configurar e gerenciar servidores Linux.', ARRAY['administração', 'sistemas', 'Linux'], ARRAY[16, 17], 7, '2024-01-15', 40, ARRAY['Comandos Linux', 'Gerenciamento de Usuários', 'Shell Scripting'], 'banner_curso7.jpg', NOW(), NOW()),
  -- Curso 8
  ('Desenvolvimento de Smart Contracts com Ethereum', 'Aprenda a criar contratos inteligentes utilizando a plataforma Ethereum.', ARRAY['desenvolvimento', 'smart', 'contracts', 'Ethereum'], ARRAY[18, 19], 8, '2024-02-28', 30, ARRAY['Solidity', 'Truffle', 'Web3.js'], 'banner_curso8.jpg', NOW(), NOW()),
  -- Curso 9
  ('Internet das Coisas e Aplicações Práticas', 'Explore os conceitos da Internet das Coisas e crie projetos reais.', ARRAY['Internet', 'Coisas', 'projetos'], ARRAY[20, 21, 22], 9, '2024-03-10', 50, ARRAY['Arduino', 'Raspberry Pi', 'Sensores'], 'banner_curso9.jpg', NOW(), NOW()),
  -- Curso 10
  ('Fundamentos de Cloud Computing', 'Descubra os conceitos fundamentais e serviços de computação em nuvem.', ARRAY['fundamentos', 'cloud', 'computing'], ARRAY[23, 24], 10, '2024-04-02', 40, ARRAY['AWS', 'Azure', 'Google Cloud'], 'banner_curso10.jpg', NOW(), NOW()),
  -- Curso 11
  ('Desenvolvimento Avançado em JavaScript', 'Aprofunde seus conhecimentos em JavaScript e crie aplicações avançadas.', ARRAY['desenvolvimento', 'JavaScript'], ARRAY[1, 2, 3], 1, '2024-05-15', 60, ARRAY['ES6', 'Node.js', 'React.js'], 'banner_curso11.jpg', NOW(), NOW()),
  -- Curso 12
  ('Machine Learning Aplicado à Visão Computacional', 'Aprenda a desenvolver sistemas de visão computacional utilizando técnicas de aprendizado de máquina.', ARRAY['machine', 'learning', 'visão', 'computacional'], ARRAY[4, 5], 2, '2024-06-20', 50, ARRAY['OpenCV', 'Redes Neurais Convolucionais', 'Detecção de Objetos'], 'banner_curso12.jpg', NOW(), NOW()),
  -- Curso 13
  ('Cibersegurança e Ethical Hacking', 'Aprenda técnicas de cibersegurança e práticas de ethical hacking para proteger sistemas e redes.', ARRAY['cibersegurança', 'ethical', 'hacking'], ARRAY[6, 7, 8], 3, '2024-07-10', 60, ARRAY['Penetration Testing', 'Segurança em Redes', 'Engenharia Social'], 'banner_curso13.jpg', NOW(), NOW()),
  -- Curso 14
  ('Desenvolvimento de Chatbots', 'Aprenda a criar chatbots inteligentes utilizando plataformas e frameworks populares.', ARRAY['desenvolvimento', 'chatbots'], ARRAY[9, 10], 4, '2024-08-05', 40, ARRAY['Dialogflow', 'Botpress', 'Rasa'], 'banner_curso14.jpg', NOW(), NOW()),
  -- Curso 15
  ('Desenvolvimento de Jogos em Unity', 'Aprenda a desenvolver jogos completos utilizando a plataforma Unity.', ARRAY['desenvolvimento', 'jogos', 'Unity'], ARRAY[11, 12, 13], 5, '2024-09-20', 60, ARRAY['C#', 'Unity Physics', 'Game Design'], 'banner_curso15.jpg', NOW(), NOW()),
  -- Curso 16
  ('Análise de Dados com Apache Spark', 'Aprenda a utilizar o Apache Spark para análise de dados em larga escala.', ARRAY['análise', 'dados', 'Apache', 'Spark'], ARRAY[14, 15], 6, '2024-10-15', 50, ARRAY['Spark SQL', 'Machine Learning com Spark', 'Streaming em Tempo Real'], 'banner_curso16.jpg', NOW(), NOW()),
  -- Curso 17
  ('Administração de Bancos de Dados', 'Aprenda a administrar e otimizar bancos de dados relacionais e não relacionais.', ARRAY['administração', 'bancos', 'dados'], ARRAY[16, 17], 7, '2024-11-10', 40, ARRAY['SQL', 'MongoDB', 'PostgreSQL'], 'banner_curso17.jpg', NOW(), NOW()),
  -- Curso 18
  ('Desenvolvimento de Aplicações Blockchain', 'Aprenda a desenvolver aplicações descentralizadas utilizando tecnologia blockchain.', ARRAY['desenvolvimento', 'aplicações', 'blockchain'], ARRAY[18, 19], 8, '2024-12-01', 30, ARRAY['Ethereum', 'Smart Contracts', 'DApps'], 'banner_curso18.jpg', NOW(), NOW()),
  -- Curso 19
  ('Integração de Dispositivos IoT', 'Aprenda a integrar dispositivos IoT e criar soluções conectadas.', ARRAY['integração', 'dispositivos', 'IoT'], ARRAY[20, 21, 22], 9, '2025-01-05', 50, ARRAY['MQTT', 'Node-RED', 'Plataformas IoT'], 'banner_curso19.jpg', NOW(), NOW()),
  -- Curso 20
  ('Arquitetura e Implantação de Infraestrutura em Nuvem', 'Aprenda a projetar e implantar infraestrutura em nuvem escalável e resiliente.', ARRAY['arquitetura', 'implantação', 'infraestrutura', 'nuvem'], ARRAY[23, 24], 10, '2025-02-15', 40, ARRAY['AWS', 'Azure', 'Google Cloud'], 'banner_curso20.jpg', NOW(), NOW());
