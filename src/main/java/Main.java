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

public class Main {
    private static boolean shouldReturnHtml(Request request) {
        String accept = request.headers("Accept");
        return accept != null && accept.contains("text/html");
    }
    private static boolean shouldReturnXml(Request request) {
        String accept = request.headers("Accept");
        return accept != null && accept.contains("text/xml");
    }
  public static void main(String[] args) {

    port(Integer.valueOf(System.getenv("PORT")));
    staticFileLocation("/public");

    get("/core.html", (req, res) -> "Hello World");
    
  }



}
