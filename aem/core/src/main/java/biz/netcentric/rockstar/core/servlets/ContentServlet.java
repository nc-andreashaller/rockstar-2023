package biz.netcentric.rockstar.core.servlets;

import java.io.IOException;
import java.net.URL;

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

import biz.netcentric.rockstar.core.utils.UrlUtils;

@Component(service = { Servlet.class })
@SlingServletResourceTypes(
    resourceTypes="/apps/rockstar-2023/content", 
    methods= "GET",
    extensions="html")
public class ContentServlet extends SlingSafeMethodsServlet {
 
    private static final Logger LOG = LoggerFactory.getLogger(ContentServlet.class);

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        if(request.getRequestPathInfo().getSuffix() == null) {
            response.sendError(404);
            return;
        }
        response.setContentType("application/json");
        response.getWriter().print(getHtml(UrlUtils.DOMAIN + request.getRequestPathInfo().getSuffix()));
    }

    private String getHtml(String rawUrl) {
        try (CloseableHttpClient client = HttpClients.createDefault()) {
            URL url = new URL(rawUrl);
            String html = client.execute(new HttpGet(rawUrl + ".plain.html"), new BasicResponseHandler());
            return UrlUtils.adjustHtmlReferences(url, html);
        } catch (IOException e) {
            LOG.error("error while doing http request: {}", rawUrl, e);
        }
        return "error while doing http request: " + rawUrl;
    }

}
