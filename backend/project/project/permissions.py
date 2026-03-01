from rest_framework.permissions import BasePermission

class IsProvider(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return "provider" in request.user.role
    
class IsCustomer(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_autheticated:
            return False

        return 'customer' in request.user.role
    
class IsProviderOrCustomer(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        return (
            'customer' in request.role or 'provider' in request.role
        )