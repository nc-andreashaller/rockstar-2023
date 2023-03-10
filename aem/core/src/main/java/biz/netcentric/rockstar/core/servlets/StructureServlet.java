package biz.netcentric.rockstar.core.servlets;

import java.io.IOException;

import javax.servlet.Servlet;
import javax.servlet.ServletException;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.request.RequestPathInfo;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.api.wrappers.SlingHttpServletRequestWrapper;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.service.component.annotations.Component;

import com.day.cq.commons.PathInfo;

@Component(service = { Servlet.class })
@SlingServletResourceTypes(
    resourceTypes="/apps/rockstar-2023/structure", 
    methods= "GET",
    selectors = "public",
    extensions="json")
public class StructureServlet extends SlingSafeMethodsServlet {
 
    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        if(request.getRequestPathInfo().getSuffix() == null) {
            response.sendError(404);
            return;
        }
        SlingHttpServletRequest wrappedRequest = new ModelRequest(request);
        request.getRequestDispatcher(wrappedRequest.getRequestPathInfo().getResourcePath()).forward(wrappedRequest, response);
    }

    private static class ModelRequest extends SlingHttpServletRequestWrapper {
        
        private String pathInfo;

        private ModelRequest(SlingHttpServletRequest wrappedRequest) {
            super(wrappedRequest);
            pathInfo = "/content/rockstar-2023" + wrappedRequest.getRequestPathInfo().getSuffix() + "/_jcr_content/root/container.model.json";
        }

        @Override
        public RequestPathInfo getRequestPathInfo() {
            return new PathInfo(getPathInfo());
        }

        @Override
        public String getPathInfo() {
            return pathInfo;
        }

    }

}
