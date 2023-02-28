package biz.netcentric.rockstar.core.servlets;

import java.io.IOException;

import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.service.component.annotations.Component;

import biz.netcentric.rockstar.core.models.ContentModel;

@Component(service = { Servlet.class })
@SlingServletResourceTypes(
    resourceTypes="/apps/rockstar-2023/content", 
    methods= "GET",
    extensions="html")
public class ContentServlet extends SlingSafeMethodsServlet {
 
    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        if(request.getRequestPathInfo().getSuffix() == null) {
            response.sendError(404);
            return;
        }
        response.getWriter().print(ContentModel.getHtml("https://main--rockstar-2023--nc-andreashaller.hlx.live" + request.getRequestPathInfo().getSuffix()));
    }
}
