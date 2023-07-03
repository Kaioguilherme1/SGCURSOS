 
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


INSERT INTO "Courses" (name, description, tags, category_id, start_date, duration_hours, lessons, banner, "createdAt", "updatedAt")
VALUES
  -- Curso 1
  ('Introdução ao Desenvolvimento Web', 'Aprenda os conceitos fundamentais de desenvolvimento web e crie seu primeiro site.', ARRAY['desenvolvimento', 'web'], 1, '2023-07-01', 40, ARRAY['HTML', 'CSS', 'JavaScript', 'HTTP', 'DOM', 'Layout Responsivo', 'Git', 'Bootstrap', 'UI/UX', 'APIs'], 'banner_curso1.jpg', NOW(), NOW()),
  -- Curso 2
  ('Análise de Dados com Python', 'Aprenda a utilizar Python para análise e visualização de dados.', ARRAY['análise', 'dados', 'Python'], 2, '2023-08-15', 30, ARRAY['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Data Cleaning', 'Análise Exploratória', 'Estatística Descritiva', 'Visualização de Dados', 'Machine Learning', 'Big Data'], 'banner_curso2.jpg', NOW(), NOW()),
  -- Curso 3
  ('Segurança de Redes', 'Aprenda sobre os princípios e práticas de segurança de redes.', ARRAY['segurança', 'redes'], 3, '2023-09-10', 50, ARRAY['Firewalls', 'Criptografia', 'Testes de penetração', 'Segurança em Wi-Fi', 'Vulnerabilidades', 'Monitoramento de Rede', 'Segurança em Servidores', 'Análise de Tráfego', 'Políticas de Segurança', 'Forense Digital'], 'banner_curso3.jpg', NOW(), NOW()),
  -- Curso 4
  ('Introdução à Inteligência Artificial', 'Descubra os conceitos básicos e aplicações da inteligência artificial.', ARRAY['inteligência', 'artificial'], 4, '2023-10-20', 40, ARRAY['Aprendizado de Máquina', 'Redes Neurais', 'Processamento de Linguagem Natural', 'Visão Computacional', 'Algoritmos Genéticos', 'Lógica Fuzzy', 'Agentes Inteligentes', 'Chatbots', 'Robótica', 'Ética em IA'], 'banner_curso4.jpg', NOW(), NOW()),
  -- Curso 5
  ('Desenvolvimento de Aplicações Mobile', 'Aprenda a criar aplicativos para dispositivos móveis utilizando frameworks populares.', ARRAY['desenvolvimento', 'mobile'], 5, '2023-11-05', 60, ARRAY['React Native', 'Flutter', 'Ionic', 'Kotlin', 'Swift', 'Arquitetura MVVM', 'Consumo de APIs', 'Armazenamento Local', 'Notificações Push', 'Publicação nas Lojas'], 'banner_curso5.jpg', NOW(), NOW()),
  -- Curso 6
  ('Big Data e Análise de Dados', 'Explore técnicas e ferramentas para lidar com grandes volumes de dados e obter insights valiosos.', ARRAY['big', 'data', 'análise', 'dados'], 6, '2023-12-12', 50, ARRAY['Hadoop', 'Spark', 'SQL', 'NoSQL', 'MapReduce', 'Data Warehousing', 'Streaming de Dados', 'Visualização de Big Data', 'Processamento em Tempo Real', 'Elasticsearch'], 'banner_curso6.jpg', NOW(), NOW()),
  -- Curso 7
  ('Administração de Sistemas Linux', 'Aprenda a configurar e gerenciar servidores Linux.', ARRAY['administração', 'sistemas', 'Linux'], 7, '2024-01-15', 40, ARRAY['Comandos Linux', 'Gerenciamento de Usuários', 'Shell Scripting', 'Redes e Conectividade', 'Segurança em Linux', 'Administração de Serviços', 'Virtualização', 'Automação de Tarefas', 'Monitoramento', 'Solução de Problemas'], 'banner_curso7.jpg', NOW(), NOW()),
  -- Curso 8
  ('Desenvolvimento de Smart Contracts com Ethereum', 'Aprenda a criar contratos inteligentes utilizando a plataforma Ethereum.', ARRAY['desenvolvimento', 'smart', 'contracts', 'Ethereum'], 8, '2024-02-28', 30, ARRAY['Solidity', 'Truffle', 'Web3.js', 'Ethereum Virtual Machine', 'Tokenização', 'Governança em Blockchain', 'Interoperabilidade', 'Segurança em Smart Contracts', 'Oráculos', 'Descentralização'], 'banner_curso8.jpg', NOW(), NOW()),
  -- Curso 9
  ('Internet das Coisas e Aplicações Práticas', 'Explore os conceitos da Internet das Coisas e crie projetos reais.', ARRAY['Internet', 'Coisas', 'projetos'], 9, '2024-03-10', 50, ARRAY['Arduino', 'Raspberry Pi', 'Sensores', 'Comunicação sem Fio', 'IoT Cloud Platforms', 'Prototipagem Rápida', 'Edge Computing', 'Segurança em IoT', 'Integração com Serviços Web', 'Sistemas de Controle'], 'banner_curso9.jpg', NOW(), NOW()),
  -- Curso 10
  ('Fundamentos de Cloud Computing', 'Descubra os conceitos fundamentais e serviços de computação em nuvem.', ARRAY['fundamentos', 'cloud', 'computing'], 10, '2024-04-02', 40, ARRAY['AWS', 'Azure', 'Google Cloud', 'Virtualização', 'Armazenamento em Nuvem', 'Redes em Nuvem', 'Containers', 'Orquestração', 'Segurança em Nuvem', 'Arquiteturas Serverless'], 'banner_curso10.jpg', NOW(), NOW()),
  -- Curso 11
  ('Desenvolvimento Avançado em JavaScript', 'Aprofunde seus conhecimentos em JavaScript e crie aplicações avançadas.', ARRAY['desenvolvimento', 'JavaScript'], 1, '2024-05-15', 60, ARRAY['ES6', 'Node.js', 'React.js', 'Express.js', 'Testes Automatizados', 'Webpack', 'Babel', 'GraphQL', 'Aplicações em Tempo Real', 'Arquiteturas Avançadas'], 'banner_curso11.jpg', NOW(), NOW()),
  -- Curso 12
  ('Machine Learning Aplicado à Visão Computacional', 'Aprenda a desenvolver sistemas de visão computacional utilizando técnicas de aprendizado de máquina.', ARRAY['machine', 'learning', 'visão', 'computacional'], 2, '2024-06-20', 50, ARRAY['OpenCV', 'Redes Neurais Convolucionais', 'Detecção de Objetos', 'Segmentação de Imagens', 'Classificação de Padrões', 'Reconhecimento Facial', 'Realidade Aumentada', 'Processamento de Vídeo', 'Transferência de Estilo', 'Deep Learning'], 'banner_curso12.jpg', NOW(), NOW()),
  -- Curso 13
  ('Cibersegurança e Ethical Hacking', 'Aprenda técnicas de cibersegurança e práticas de ethical hacking para proteger sistemas e redes.', ARRAY['cibersegurança', 'ethical', 'hacking'], 3, '2024-07-10', 60, ARRAY['Penetration Testing', 'Segurança em Redes', 'Engenharia Social', 'Análise de Vulnerabilidades', 'Cryptography', 'Forensics', 'Firewalls', 'Segurança em Web', 'Malware Analysis', 'Ética e Legislação'], 'banner_curso13.jpg', NOW(), NOW()),
  -- Curso 14
  ('Desenvolvimento de Chatbots', 'Aprenda a criar chatbots inteligentes utilizando plataformas e frameworks populares.', ARRAY['desenvolvimento', 'chatbots'], 4, '2024-08-05', 40, ARRAY['Dialogflow', 'Botpress', 'Rasa', 'Natural Language Processing', 'Integração com APIs', 'Machine Learning em Chatbots', 'Design de Conversação', 'Chatbots Voice', 'Chatbots para E-commerce', 'Chatbots para Atendimento'], 'banner_curso14.jpg', NOW(), NOW()),
  -- Curso 15
  ('Desenvolvimento de Jogos em Unity', 'Aprenda a desenvolver jogos completos utilizando a plataforma Unity.', ARRAY['desenvolvimento', 'jogos', 'Unity'], 5, '2024-09-20', 60, ARRAY['C#', 'Unity Physics', 'Game Design', 'Inteligência Artificial em Jogos', 'Física Avançada', 'Criação de Personagens', 'Controles de Jogabilidade', 'Animação', 'Realidade Virtual', 'Publicação de Jogos'], 'banner_curso15.jpg', NOW(), NOW()),
  -- Curso 16
  ('Desenvolvimento de Aplicações React', 'Aprenda a desenvolver aplicações web utilizando o framework React.', ARRAY['desenvolvimento', 'React', 'frontend'], 1, '2025-03-10', 40, ARRAY['Componentes', 'Estado e Ciclo de Vida', 'Roteamento', 'Redux', 'Hooks', 'Testes Unitários', 'Estilização com CSS-in-JS', 'Server-Side Rendering', 'Controle de Formulários', 'Integração com APIs'], 'banner_curso21.jpg', NOW(), NOW()),
  -- Curso 17
  ('Aprendizado de Máquina com Python', 'Aprenda os fundamentos do aprendizado de máquina utilizando Python.', ARRAY['aprendizado', 'máquina', 'Python'], 2, '2025-04-15', 50, ARRAY['Classificação', 'Regressão', 'Agrupamento', 'Processamento de Linguagem Natural', 'Redes Neurais', 'Aprendizado por Reforço', 'Validação de Modelos', 'Feature Engineering', 'Dimensionality Reduction', 'Modelos Pré-Treinados'], 'banner_curso22.jpg', NOW(), NOW()),
  -- Curso 18
  ('Hacking Ético Avançado', 'Aprofunde seus conhecimentos em hacking ético e segurança cibernética.', ARRAY['hacking', 'segurança', 'cibernética'], 3, '2025-05-20', 60, ARRAY['Advanced Penetration Testing', 'Exploitation Techniques', 'Reverse Engineering', 'Forensic Analysis', 'Wireless Security', 'Web Application Security', 'Secure Coding Practices', 'Security Operations', 'Social Engineering', 'Cryptography'], 'banner_curso23.jpg', NOW(), NOW()),
  -- Curso 19
  ('Desenvolvimento de Aplicações Mobile com Flutter', 'Aprenda a criar aplicativos móveis multiplataforma utilizando o framework Flutter.', ARRAY['desenvolvimento', 'mobile', 'Flutter'], 5, '2025-06-25', 60, ARRAY['Widgets', 'Gerenciamento de Estado', 'Navegação', 'Consumo de APIs', 'Armazenamento Local', 'Autenticação', 'Animações', 'Testes Automatizados', 'Publicação de Apps', 'Integração com Serviços Firebase'], 'banner_curso24.jpg', NOW(), NOW()),
  -- Curso 20
  ('Data Science para Negócios', 'Descubra como aplicar técnicas de data science para resolver problemas de negócios.', ARRAY['data', 'science', 'negócios'], 2, '2025-07-30', 50, ARRAY['Análise Exploratória', 'Previsão de Demanda', 'Segmentação de Clientes', 'Otimização de Preços', 'Recomendação Personalizada', 'Análise de Sentimento', 'Detecção de Fraudes', 'Avaliação de Impacto', 'Experimentação', 'Visualização de Dados'], 'banner_curso25.jpg', NOW(), NOW());
