-- Table: public.partida

-- DROP TABLE IF EXISTS public.partida;

CREATE TABLE IF NOT EXISTS public.partida
(
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    sport VARCHAR(50),
    data VARCHAR(50) NOT NULL,
    num_jogadores INTEGER,
    court_name VARCHAR(50),
    court_type VARCHAR(50),
    status VARCHAR(50) NOT NULL
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.partida
    OWNER to felipe;

-- Table: public.quadra

-- DROP TABLE IF EXISTS public.quadra;

CREATE TABLE IF NOT EXISTS public.quadra
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    preco INTEGER,
    endereco VARCHAR(100) NOT NULL,
    horario VARCHAR(100)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.quadra
    OWNER to felipe;

-- Table: public.usuario

-- DROP TABLE IF EXISTS public.usuario;

CREATE TABLE IF NOT EXISTS public.usuario
(
    cpf INTEGER PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.usuario
    OWNER to felipe;
