import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

@ManagedBean(name = "resultBean")
@SessionScoped
public class ResultBean implements Serializable {
    private final SimpleDateFormat formatter;
    private ArrayList<Result> results;
    private Result current;
    private EntityManager manager;
    private EntityTransaction transaction;

    public ResultBean() {
        formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        results = new ArrayList<>();
        current = new Result();
        connectToDB();
        loadResults();
    }

    private void connectToDB() {
        manager = Persistence.createEntityManagerFactory("result").createEntityManager();
        transaction = manager.getTransaction();
    }

    public void loadResults() {
        try {
            transaction.begin();
            results = (ArrayList<Result>) manager.createQuery("SELECT r FROM Result r", Result.class).getResultList();
            transaction.commit();
        } catch (Exception e) {
            if (transaction.isActive()) {
                transaction.rollback();
            }
        }
    }

    public void addResult() {
        try {
            long start = System.nanoTime();
            Date date = new Date(System.currentTimeMillis());
            String currentTime = formatter.format(date);
            transaction.begin();
            current.setCurrentTime(currentTime);
            if (current.checkHit()) {
                current.setHitFact(true);
            }
            String executionTime = String.format("%.6f", (System.nanoTime() - start) * 10e-9).replace(",", ".");
            current.setExecutionTime(executionTime);
            manager.persist(current);
            results.add(current);
            current = new Result();
            transaction.commit();
        } catch (Exception e) {
            if (transaction.isActive()) {
                transaction.rollback();
            }
        }
    }

    public void clearResults() {
        try {
            transaction.begin();
            manager.createQuery("DELETE FROM Result").executeUpdate();
            results.clear();
            transaction.commit();
        } catch (Exception e) {
            if (transaction.isActive()) {
                transaction.rollback();
            }
        }
    }

    public ArrayList<Result> getResults() {
        return results;
    }

    public void setResults(ArrayList<Result> results) {
        this.results = results;
    }

    public Result getCurrent() {
        return current;
    }

    public void setCurrent(Result current) {
        this.current = current;
    }
}
