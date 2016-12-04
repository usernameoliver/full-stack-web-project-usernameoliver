import java.io.IOException;
import java.sql.*;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.Map;

import java.net.URI;
import java.net.URISyntaxException;

import static spark.Spark.*;
import spark.ModelAndView;
import static spark.Spark.get;

import com.heroku.sdk.jdbc.DatabaseUrl;
import spark.Request;
import spark.Response;
import spark.Route;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class Main {

  public static void main(String[] args) throws IOException {

    port(Integer.valueOf(System.getenv("PORT")));

    ProcessBuilder pb = new ProcessBuilder("node /Users/deganhao/web/Nov13full-stack/full-stack-web-project-usernameoliver/app.js");

      try {
          Process p = pb.start();
      } catch (IOException e) {
          e.printStackTrace();
      }
      staticFileLocation("/public");
    get("/", (req, res) -> "Hello World");

    
  }



}
