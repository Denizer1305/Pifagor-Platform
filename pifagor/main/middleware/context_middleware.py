from django.utils.deprecation import MiddlewareMixin

class MainContextMiddleware(MiddlewareMixin):
    def process_template_response(self, request, response):
        if hasattr(response, 'context_data'):
            response.context_data.setdefault('title', 'Пифагор - Образовательная платформа')
            
            if request.resolver_match:
                response.context_data['active_page'] = request.resolver_match.url_name
                
        return response