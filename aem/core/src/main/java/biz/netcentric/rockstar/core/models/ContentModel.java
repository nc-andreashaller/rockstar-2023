package biz.netcentric.rockstar.core.models;

import java.io.IOException;
import java.net.URL;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(adaptables = Resource.class)
public class ContentModel {

    private static final Logger LOG = LoggerFactory.getLogger(ContentModel.class);

    @Inject
    private String reference;
    
    @PostConstruct
    public void init() {

    }

    public String getReference() {
        return reference;
    }

    public String getHtml() {
        try (CloseableHttpClient client = HttpClients.createDefault()) {
            URL reference = new URL(getReference());
            String html = client.execute(new HttpGet(getReference() + ".plain.html"), new BasicResponseHandler());
            return html.replaceAll("src(set)?=\"\\./media", "src=\"" + new URL(reference.getProtocol(), reference.getHost(), "/") + "media");
        } catch (IOException e) {
            LOG.error("error while doing http request: {}", getReference(), e);
        }
        return "error while doing http request: " + getReference();
    }

    public static String getHtml(String rawUrl) {
        try (CloseableHttpClient client = HttpClients.createDefault()) {
            URL url = new URL(rawUrl);
            String html = client.execute(new HttpGet(rawUrl + ".plain.html"), new BasicResponseHandler());
            return html.replaceAll("src(set)?=\"\\./media", "src=\"" + new URL(url.getProtocol(), url.getHost(), "/") + "media");
        } catch (IOException e) {
            LOG.error("error while doing http request: {}", rawUrl, e);
        }
        return "error while doing http request: " + rawUrl;
    }


}