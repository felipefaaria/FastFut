package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import model.Usuario;

public class UsuarioDAO extends DAO {
	public UsuarioDAO() {
		super();
		conectar();
	}

	public void finalize() {
		close();
	}

	public boolean insert(Usuario usuario) {
		boolean status = false;
		try {
			String senhaCripto = toMD5(usuario.getSenha());
			String sql = "INSERT INTO usuario (cpf, nome, email, senha) "
					+ "VALUES (?, ?, ?, ?)";
			PreparedStatement st = conexao.prepareStatement(sql);
			st.setInt(1, usuario.getCpf());
			st.setString(2, usuario.getNome());
			st.setString(3, usuario.getEmail());
			st.setString(4, senhaCripto);
			st.executeUpdate();
			st.close();
			status = true;
		} catch (SQLException u) {
			throw new RuntimeException(u);
		} catch (Exception e) {
			throw new RuntimeException("Erro ao criptografar a senha: " + e.getMessage());
		}
		return status;
	}

	public boolean delete(int cpf) {
		boolean status = false;
		try {
			Statement st = conexao.createStatement();
			st.executeUpdate("DELETE FROM usuario WHERE cpf = " + cpf);
			st.close();
			status = true;
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		return status;
	}

	public boolean update(Usuario usuario) {
		boolean status = false;
		try {
			String sql = "UPDATE usuario SET cpf = '" + usuario.getCpf() + "', nome = '"
					+ usuario.getNome() + "', email = '" + usuario.getEmail() + "', senha = " + usuario.getSenha()
					+ "'"
					+ " WHERE cpf = " + usuario.getCpf();
			PreparedStatement st = conexao.prepareStatement(sql);
			st.executeUpdate();
			st.close();
			status = true;
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		return status;
	}

	public Usuario get(int cpf) {
		Usuario usuario = null;
		try {
			String sql = "SELECT * FROM usuario WHERE cpf = ?";
			PreparedStatement st = conexao.prepareStatement(sql);
			st.setInt(1, cpf);
			ResultSet rs = st.executeQuery();
			if (rs.next()) {
				usuario = new Usuario(
						rs.getInt("cpf"),
						rs.getString("nome"),
						rs.getString("email"),
						rs.getString("senha"));
			}
			st.close();
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		return usuario;
	}

	public Usuario[] list() {
		Usuario[] usuarios = null;
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM usuario");
			if (rs.next()) {
				rs.last();
				usuarios = new Usuario[rs.getRow()];
				rs.beforeFirst();

				for (int i = 0; rs.next(); i++) {
					usuarios[i] = new Usuario(
							rs.getInt("cpf"),
							rs.getString("nome"),
							rs.getString("email"),
							rs.getString("senha"));
				}
			}
			st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return usuarios;
	}
}