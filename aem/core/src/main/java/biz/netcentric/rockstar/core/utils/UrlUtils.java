package biz.netcentric.rockstar.core.utils;

import java.net.MalformedURLException;
import java.net.URL;

public class UrlUtils {
    
    public static final String DOMAIN = "https://main--rockstar-2023--nc-andreashaller.hlx.live";

    public static String adjustHtmlReferences(URL source, String html) throws MalformedURLException {
        return html.replaceAll("src(set)?=\"\\./media", "src=\"" + new URL(source.getProtocol(), source.getHost(), "/") + "media");
    }

}