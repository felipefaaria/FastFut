package model;

public class Quadra {
	private int id;
	private String nome;
	private int preco;
	private String endereco;
	private String horario;

	public Quadra() {
		endereco = nome = horario = "";
		id = preco = 0;
	}

	public Quadra(int id, String nome, int preco, String endereco, String horario) {
		this.id = id;
		this.nome = nome;
		this.preco = preco;
		this.endereco = endereco;
		this.horario = horario;

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public int getPreco() {
		return preco;
	}

	public void setPreco(int preco) {
		this.preco = preco;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getHorario() {
		return horario;
	}

	public void setHorario(String horario) {
		this.horario = horario;
	}

	@Override
	public String toString() {
		String resp = id + ":" + nome + ":" + preco + ":" + ":" + endereco + ":" + horario;
		return resp;
	}
}
