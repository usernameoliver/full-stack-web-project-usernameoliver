import freemarker.template.Configuration;
import freemarker.template.TemplateExceptionHandler;
import spark.Request;

import java.io.File;
import java.io.IOException;

import static spark.Spark.*;

public class Main {

  public static void main(String[] args) {
    port(getHerokuAssignedPort());
    get("/", (req, res) -> {

      if (shouldReturnHtml(req)) {
        // produce HTML
        return "hi";
      } else {
        // produce JSON
        return "hello";
      }
    });
  }
  private static boolean shouldReturnHtml(Request request) {
    String accept = request.headers("Accept");
    return accept != null && accept.contains("text/html");
  }

  static int getHerokuAssignedPort() {
    ProcessBuilder processBuilder = new ProcessBuilder();
    if (processBuilder.environment().get("PORT") != null) {
        System.out.println("listening from " + processBuilder.environment().get("PORT"));
      return Integer.parseInt(processBuilder.environment().get("PORT"));
    }
    return 4567; //return default port if heroku-port isn't set (i.e. on localhost)
  }

}