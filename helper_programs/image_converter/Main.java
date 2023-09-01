import java.awt.*;
import java.io.IOException;
import javax.swing.*;

public class Main {

    private static Test panel;

    public static void main(String[] args) throws IOException {
        JFrame window = new JFrame();
        window.setSize(600, 600);
        window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        window.setLayout(new BorderLayout());

        panel = new Test();
        window.add(panel, BorderLayout.CENTER);

        window.setVisible(true);
    }
}
