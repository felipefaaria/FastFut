package dao;

import java.sql.Statement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import model.Quadra;

public class QuadraDAO extends DAO {
	public QuadraDAO() {
		super();
		conectar();
	}

	public void finalize() {
		close();
	}

	public boolean insert(Quadra quadra) {

		boolean status = false;
		try {

			String sql = "INSERT INTO quadra ( id, nome, preco,endereco, horario) "
					+ "VALUES ('" + quadra.getId() + "', '" + quadra.getNome() + "','" + quadra.getPreco() + "', '"
					+ quadra.getEndereco() + "', '"
					+ quadra.getHorario() + "');";
			PreparedStatement st = conexao.prepareStatement(sql);
			st.executeUpdate();
			st.close();
			status = true;
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		return status;
	}

	public boolean delete(int id) {
		boolean status = false;
		try {
			Statement st = conexao.createStatement();
			st.executeUpdate("DELETE FROM quadra WHERE id = " + id);
			st.close();
			status = true;
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		return status;
	}

	public boolean update(Quadra quadra) {
		boolean status = false;
		try {

			String sql = "UPDATE quadra SET nome = '" + quadra.getNome() +
					"', preco = " + quadra.getPreco() +
					", endereco = '" + quadra.getEndereco() +
					"' WHERE id = " + quadra.getId();

			PreparedStatement st = conexao.prepareStatement(sql);
			st.executeUpdate();
			st.close();
			status = true;
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		return status;
	}

	public Quadra get(int id) {
		Quadra quadra = null;
		try {
			Statement st = conexao.createStatement();
			ResultSet rs = st.executeQuery("SELECT * FROM quadra WHERE id = " + id);
			if (rs.next()) {
				quadra = new Quadra(
						rs.getInt("id"),
						rs.getString("nome"),
						rs.getInt("preco"),
						rs.getString("endereco"),
						rs.getString("horario"));
			}
			st.close();
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		return quadra;
	}

	public Quadra[] list() {
		Quadra[] quadras = null;
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM quadra");
			if (rs.next()) {
				rs.last();
				quadras = new Quadra[rs.getRow()];
				rs.beforeFirst();

				for (int i = 0; rs.next(); i++) {
					quadras[i] = new Quadra(
							rs.getInt("id"),
							rs.getString("nome"),
							rs.getInt("preco"),
							rs.getString("endereco"),
							rs.getString("horario"));
				}
			}
			st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return quadras;
	}
}