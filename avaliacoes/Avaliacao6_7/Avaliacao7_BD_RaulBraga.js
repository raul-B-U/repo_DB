 var sqlite3 = require('sqlite3');

 var db = new sqlite3.Database('SCA.db');
 db.get("PRAGMA foreign_keys = ON")

 db.serialize(function() {
     // Cria tabelas
  db.run("CREATE TABLE IF NOT EXISTS TB_ALUNO ("
         +"id INTEGER PRIMARY KEY,"
         +"nome TEXT)");
   
   db.run("CREATE TABLE IF NOT EXISTS TB_PROFESSOR ("
          +"id INTEGER PRIMARY KEY," 
          +"nome TEXT)");
   
   db.run("CREATE TABLE IF NOT EXISTS TB_DISCIPLINA ("
         +"id INTEGER PRIMARY KEY,"
         +"nome TEXT)")
   
   db.run("CREATE TABLE IF NOT EXISTS TB_MATRICULA ("
          +"id INTEGER PRIMARY KEY,"
          +"aluno_id integer not null,"
          +"professor_id integer not null,"
          +"disciplina_id integer not null,"
          +"FOREIGN KEY (aluno_id) references TB_ALUNO(id),"
         +"FOREIGN KEY (disciplina_id) references TB_DISCIPLINA(id),"
         +"FOREIGN KEY (professor_id) references TB_PROFESSOR(id))");
   
   db.run("CREATE TABLE IF NOT EXISTS TB_PROFESSOR_DISCIPLINA("
         +"id INTEGER PRIMARY KEY,"
          +"disciplina_id integer not null,"
          +"professor_id integer not null,"
         +"FOREIGN KEY (disciplina_id) references TB_DISCIPLINA(id),"
         +"FOREIGN KEY (professor_id) references TB_PROFESSOR(id))");

   //Inserindo data nas tabelas


  //Inserindo na tabela alunos (Id autoincrementa)
   db.run("insert into TB_ALUNO (nome)"
          +"values"+
          "('Gabriel Dext'),"+
          "('Raul Braga')")


   //Inserindo na tabela professor (Id autoincrementa)
   db.run("insert into TB_PROFESSOR (nome)"
         +"values"+
        "('Maurício'),"+
        "('Serra'),"+
        "('Taveira')")

   //Inserindo na tabela disciplina (Id autoincrementa)

   db.run("insert into TB_DISCIPLINA (nome)"
         +"values"+
          "('Eletrônica Digital'),"+
          "('Banco de Dados'),"+
          "('PDM II')")


  //Inserindo na tabela de 'relacionamentos'

   //TB_MATRICULA
  db.run("insert into TB_MATRICULA (aluno_id, disciplina_id, professor_id)"+
         "values(1,1,1),(2,1,1),(1,2,2),(2,2,2),(1,3,3),(2,3,3)")
  //TB_PROFESSOR_DISCIPLINA

   db.run("insert into TB_PROFESSOR_DISCIPLINA(disciplina_id, professor_id)"+
         "values(1,1),(2,2),(3,3)")
   
  //Buscando dados nas tabelas
   
  db.each("SELECT id, nome FROM TB_ALUNO", function(err, row) {
    console.log(row.id + ": " + row.nome);

  });

    db.each("SELECT id, nome FROM TB_PROFESSOR", function(err, row) {
    console.log(row.id + ": " + row.nome);

  });
   
  db.each("SELECT id, nome FROM TB_DISCIPLINA", function(err, row) {
    console.log(row.id + ": " + row.nome);

  });

db.each("SELECT TB_MATRICULA.id AS matricula_id, TB_ALUNO.nome AS aluno_nome, TB_DISCIPLINA.nome AS disciplina_nome, TB_PROFESSOR.nome AS professor_nome FROM TB_ALUNO, TB_DISCIPLINA, TB_PROFESSOR INNER JOIN TB_MATRICULA ON TB_ALUNO.id = TB_MATRICULA.aluno_id AND TB_DISCIPLINA.id = TB_MATRICULA.disciplina_id AND TB_PROFESSOR.id = TB_MATRICULA.professor_id", function(err, row) {
    	console.log(row.matricula_id + ": (" + row.aluno_nome + ", " + row.disciplina_nome + ", " + row.professor_nome + ")");
	});

	db.each("SELECT TB_PROFESSOR_DISCIPLINA.id AS prof_disc_id, TB_PROFESSOR.nome AS professor_nome, TB_DISCIPLINA.nome AS disciplina_nome FROM TB_PROFESSOR, TB_DISCIPLINA INNER JOIN TB_PROFESSOR_DISCIPLINA ON TB_PROFESSOR.id = TB_PROFESSOR_DISCIPLINA.professor_id AND TB_DISCIPLINA.id = TB_PROFESSOR_DISCIPLINA.disciplina_id", function(err, row) {
    	console.log(row.prof_disc_id + ": (" + row.professor_nome + ", " + row.disciplina_nome + ")");
	});
});
  

db.close();
   