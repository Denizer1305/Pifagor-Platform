from django.utils.deprecation import MiddlewareMixin

class JSModulesMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        if response.status_code == 200 and 'text/html' in response.get('Content-Type', ''):
            if hasattr(response, 'content'):
                try:
                    content = response.content.decode('utf-8')
                    
                    body_class = self._get_body_class(content)
                    modules_to_load = self._get_modules_for_page(body_class, request.path)
                    
                    if modules_to_load and '</body>' in content:
                        modules_html = self._generate_modules_html(modules_to_load)
                        content = content.replace('</body>', modules_html + '</body>')
                        response.content = content.encode('utf-8')
                        
                except (UnicodeDecodeError, AttributeError):
                    pass
        return response
    
    def _get_body_class(self, content):
        import re
        match = re.search(r'<body class="([^"]*)"', content)
        return match.group(1) if match else ""
    
    def _get_modules_for_page(self, body_class, path):
        modules = ['/static/js/main.js']
        
        if 'main-page' in body_class:
            if 'teachers' in path:
                modules.append('/static/js/pages/teachers.js')
            if 'contact' in path:
                modules.append('/static/js/pages/contact-pages.js')
        
        if any(page in body_class for page in ['login-page', 'register-page', 'password-reset-page']):
            modules.append('/static/js/pages/auth-pages.js')
            
        return modules
    
    def _generate_modules_html(self, modules):
        return '\n'.join([f'<script type="module" src="{module}"></script>' for module in modules])