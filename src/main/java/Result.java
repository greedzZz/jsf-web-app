import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

@Entity
public class Result implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
    private double x;
    private double y;
    private double r;
    private String currentTime;
    private String executionTime;
    private boolean hitFact;

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public String getCurrentTime() {
        return currentTime;
    }

    public String getExecutionTime() {
        return executionTime;
    }

    public boolean getHitFact() {
        return hitFact;
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setR(double r) {
        this.r = r;
    }

    public void setCurrentTime(String currentTime) {
        this.currentTime = currentTime;
    }

    public void setExecutionTime(String executionTime) {
        this.executionTime = executionTime;
    }

    public void setHitFact(boolean hitFact) {
        this.hitFact = hitFact;
    }

    private boolean checkCircle(double x, double y, double r) {
        return x <= 0 && y >= 0 && Math.sqrt(x * x + y * y) <= r;
    }

    private boolean checkTriangle(double x, double y, double r) {
        return x >= 0 && y <= 0 && y >= 2 * x - r;
    }

    private boolean checkRectangle(double x, double y, double r) {
        return x <= 0 && y <= 0 && x >= -r && y >= -r;
    }

    public boolean checkHit() {
        return checkCircle(x, y, r) || checkTriangle(x, y, r) || checkRectangle(x, y, r);
    }

    @Override
    public String toString() {
        return "Result{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", currentTime=" + currentTime +
                ", executionTime=" + executionTime +
                ", hitFact=" + hitFact +
                "}";
    }

    @Override
    public int hashCode() {
        return Objects.hash(getX(), getY(), getR());
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj instanceof Result) {
            Result result = (Result) obj;
            return Double.compare(result.getX(), getX()) == 0 &&
                    Double.compare(result.getY(), getY()) == 0 &&
                    Double.compare(result.getR(), getR()) == 0 &&
                    result.getCurrentTime().equals(getCurrentTime()) &&
                    result.getHitFact() == getHitFact();
        }
        return false;
    }
}
