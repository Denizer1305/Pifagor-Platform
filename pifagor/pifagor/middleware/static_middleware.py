from django.utils.deprecation import MiddlewareMixin
import logging

logger = logging.getLogger(__name__)

class StaticFilesMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        logger.debug(f"StaticFilesMiddleware: Processing {request.path}")
        
        if (response.status_code == 200 and 
            hasattr(response, 'content') and 
            'text/html' in response.get('Content-Type', '')):
            
            try:
                content = response.content.decode('utf-8')
                if '</body>' in content:
                    logger.debug("StaticFilesMiddleware: Adding JS module")
                    js_module = '<script type="module" src="/static/js/main.js"></script>'
                    content = content.replace('</body>', js_module + '</body>')
                    response.content = content.encode('utf-8')
            except (UnicodeDecodeError, AttributeError) as e:
                logger.error(f"StaticFilesMiddleware error: {e}")
                
        return response