package dao;

import java.sql.Statement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import model.Partida;

public class PartidaDAO extends DAO {
	public PartidaDAO() {
		super();
		conectar();
	}

	public void finalize() {
		close();
	}

	public boolean insert(Partida partida) {
		boolean status = false;
		try {
			String sql = "INSERT INTO partida (id, title, sport, data, num_jogadores, court_name, court_type, status) "
					+ "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

			PreparedStatement st = conexao.prepareStatement(sql);
			st.setInt(1, partida.getId());
			st.setString(2, partida.getTitle());
			st.setString(3, partida.getSport());
			st.setString(4, partida.getData());
			st.setInt(5, partida.getNum_jogadores());
			st.setString(6, partida.getCourt_name());
			st.setString(7, partida.getCourt_type());
			st.setString(8, partida.getStatus());

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
			st.executeUpdate("DELETE FROM partida WHERE id = " + id);
			st.close();
			status = true;
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		return status;
	}

	public boolean update(Partida partida) {
		boolean status = false;
		try {
			String sql = "UPDATE partida SET title = ?, sport = ?, data = ?, num_jogadores = ?, court_name = ?, court_type = ?, status = ? WHERE id = ?";

			PreparedStatement st = conexao.prepareStatement(sql);
			st.setString(1, partida.getTitle());
			st.setString(2, partida.getSport());
			st.setString(3, partida.getData());
			st.setInt(4, partida.getNum_jogadores());
			st.setString(5, partida.getCourt_name());
			st.setString(6, partida.getCourt_type());
			st.setString(7, partida.getStatus());
			st.setInt(8, partida.getId());

			st.executeUpdate();
			st.close();
			status = true;
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		return status;
	}

	public Partida get(int id) {
		Partida partida = null;
		try {
			Statement st = conexao.createStatement();
			ResultSet rs = st.executeQuery("SELECT * FROM partida WHERE id = " + id);
			if (rs.next()) {
				partida = new Partida(
						rs.getInt("id"),
						rs.getString("title"),
						rs.getString("sport"),
						rs.getString("data"),
						rs.getInt("num_jogadores"),
						rs.getString("court_name"),
						rs.getString("court_type"),
						rs.getString("status"));
			}
			st.close();
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		return partida;
	}

	public Partida[] list() {
		Partida[] partidas = null;
		try {
			Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
			ResultSet rs = st.executeQuery("SELECT * FROM partida");
			if (rs.next()) {
				rs.last();
				partidas = new Partida[rs.getRow()];
				rs.beforeFirst();

				for (int i = 0; rs.next(); i++) {
					partidas[i] = new Partida(
							rs.getInt("id"),
							rs.getString("title"),
							rs.getString("sport"),
							rs.getString("data"),
							rs.getInt("num_jogadores"),
							rs.getString("court_name"),
							rs.getString("court_type"),
							rs.getString("status"));
				}
			}
			st.close();
		} catch (Exception e) {
			System.err.println(e.getMessage());
		}
		return partidas;
	}
}