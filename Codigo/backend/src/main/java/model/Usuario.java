package model;

public class Usuario {
	private int cpf;
	private String nome;
	private String email;
	private String senha;

	public Usuario() {
		nome = email = senha = "";
		cpf = 0;
	}

	public Usuario(int cpf, String nome, String email, String senha) {
		super();
		this.cpf = cpf;
		this.nome = nome;
		this.email = email;
		this.senha = senha;

	}

	public int getCpf() {
		return cpf;
	}

	public void setCpf(int cpf) {
		this.cpf = cpf;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getNome() {
		return nome;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getSenha() {

		return senha;
	}

	@Override
	public String toString() {
		String resp = cpf + ":" + email + ":" + nome + ":" + senha;
		return resp;
	}
}