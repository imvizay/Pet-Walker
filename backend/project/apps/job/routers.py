
from rest_framework.routers import DefaultRouter
from apps.job.views import PetTypeView,PetBreedView,MyJobPostView
router = DefaultRouter()

router.register(r'pet-type',PetTypeView,basename="bn-pet-type")
router.register(r'pet-breed',PetBreedView,basename="bn-pet-breed")
router.register(r'my/jobpost',MyJobPostView,basename='bn-jobpost') # all , get , update , remove  

urlpatterns = router.urls