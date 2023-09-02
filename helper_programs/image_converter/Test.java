import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class Test extends JPanel implements MouseListener {
    private BufferedImage img;
    private final int RES_LOSS = 4;

    public Test() throws IOException {
        addMouseListener(this);

        img = ImageIO.read(new File("src/globe2.png"));
    }

    @Override
    public void paintComponent(Graphics g){
        super.paintComponent(g);
        g.drawImage(img, 0, 0, this);

        FileWriter file = null;
        try {
            file = new FileWriter("src/colors.txt");

            file.write("const mapData = [\n");

            for(int y = 0; y < img.getHeight(); y++) {
                if(y % RES_LOSS != 0) continue;

                file.write("\t\"");
                for (int x = 0; x < img.getWidth(); x++) {
                    if(x % RES_LOSS != 0) continue;

                    Color rgb = new Color(img.getRGB(x, y));

                    if(x != img.getWidth() - 1)
                        file.write((int)rgb.getRed() + ",");
                    else
                        file.write((int)rgb.getRed() + "");
                }

                if(y != img.getHeight() - 1)
                    file.write("\",\n");
                else
                    file.write("\"\n");
            }
            file.write("];\n");

            file.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void mouseClicked(MouseEvent e) {
        System.out.println(img.getRGB(e.getX(), e.getY()));
    }

    @Override public void mousePressed(MouseEvent e) {}
    @Override public void mouseReleased(MouseEvent e) {}
    @Override public void mouseEntered(MouseEvent e) {}
    @Override public void mouseExited(MouseEvent e) {}
}
