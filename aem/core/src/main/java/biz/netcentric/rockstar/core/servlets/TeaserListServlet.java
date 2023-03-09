package biz.netcentric.rockstar.core.servlets;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;

import biz.netcentric.rockstar.core.utils.UrlUtils;

@Component(service = { Servlet.class })
@SlingServletResourceTypes(
    resourceTypes="/apps/rockstar-2023/teaser-list", 
    methods= "GET",
    selectors = "public",
    extensions="json")
public class TeaserListServlet extends SlingSafeMethodsServlet {
 
    private static final Logger LOG = LoggerFactory.getLogger(TeaserListServlet.class);

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        try (CloseableHttpClient client = HttpClients.createDefault()) {
            URL endpoint = new URL(UrlUtils.DOMAIN + "/query-index.json");
            String json = client.execute(new HttpGet(endpoint.toURI()), new BasicResponseHandler());

            ObjectMapper mapper = new ObjectMapper();
            List<Map<String, String>> teaserList = new ArrayList<>();
            Map<String, ?> parsedJson = (Map<String, ?>) mapper.readValue(json, Map.class);
            for(Map<String, String> page : (List<Map<String, String>>) parsedJson.get("data")) {
                String suffix = request.getRequestPathInfo().getSuffix();
                if(page.get("path").startsWith(suffix == null ? "/" : suffix)) {
                    Map<String, String> teaser = new HashMap<>();
                    teaser.put("url", page.get("path"));
                    teaser.put("title", page.get("title"));
                    teaser.put("image", UrlUtils.adjustHtmlReferences(endpoint, page.get("image")));
                    teaserList.add(teaser);
                }
            }
            response.setContentType("application/json");
            response.getWriter().print(mapper.writeValueAsString(teaserList));
        } catch (IOException | URISyntaxException e) {
            LOG.error("error while doing http request.", e);
            response.sendError(500);
        }
    }
}
