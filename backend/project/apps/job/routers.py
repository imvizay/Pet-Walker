
from rest_framework.routers import DefaultRouter
from apps.job.views import PetTypeView,PetBreedView
router = DefaultRouter()

router.register(f'pet-type',PetTypeView,basename="bn-pet-type")
router.register(f'pet-breed',PetBreedView,basename="bn-pet-breed")


urlpatterns = router.urls