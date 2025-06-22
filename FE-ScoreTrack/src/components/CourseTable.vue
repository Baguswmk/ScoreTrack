<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">Courses</h2>
      <button @click="openAddModal" class="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span>Add Course</span>
      </button>
    </div>

    <!-- Category Filters -->
    <div class="flex space-x-4 mb-6">
      <button v-for="cat in categories" :key="cat" @click="selectedCategory = cat" :class="[
        'px-4 py-2 rounded-md cursor-pointer whitespace-nowrap',
        selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 shadow'
      ]">
        {{ cat }}
      </button>
    </div>

    <!-- Course Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(course, index) in filteredCourses" :key="index" class="bg-white rounded-lg shadow overflow-hidden">
        <div class="h-40 bg-cover bg-center" :style="{ backgroundImage: `url('https://picsum.photos/400/300')` }"></div>
        <div class="p-6">
          <div class="flex justify-between items-start">
            <h3 class="text-lg font-bold text-gray-800">{{ course.name }}</h3>
          </div>
          <div class="mt-4">
            <div class="text-sm text-gray-600 mb-2">
              <strong>Instructor:</strong> {{ course.Mentor?.name }}
            </div>
            <div class="text-sm text-gray-600 mb-4">
              <strong>Category:</strong> {{ course.CourseCategory?.name || 'N/A' }}
            </div>
            <div class="mb-4">
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full"></div>
              </div>
            </div>
            <div class="flex justify-end space-x-2">
              <button @click="editCourse(course)" class="text-blue-600 hover:text-blue-900 cursor-pointer">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.232 5.232l3.536 3.536M16.732 3.732a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button @click="openDeleteModal(course)" class="text-red-600 hover:text-red-900 cursor-pointer">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Add/Edit Course -->
    <div v-if="showModal" :style="{ backgroundColor: 'rgba(75, 85, 99, 0.75)' }"
      class="fixed inset-0  flex items-center justify-center z-50">
      <div class="bg-white text-gray-700  p-6 rounded-lg shadow-lg w-[400px]">
        <h2 class="text-xl font-bold mb-4">{{ form.id ? 'Edit' : 'Add' }} Course</h2>
        <form @submit.prevent="saveCourse" class="space-y-3">
          <div>
            <label class="block text-sm font-medium mb-1">Course Name</label>
            <input v-model="form.name" placeholder="Course name" class="w-full p-2 border rounded" />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Category</label>
            <select v-model="form.categoryId" class="w-full p-2 border rounded">
              <option disabled value="">Select Category</option>
              <option v-for="cat in categoryStore.categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Mentor</label>
            <select v-model="form.mentorId" class="w-full p-2 border rounded">
              <option disabled value="">Select Mentor</option>
              <option v-for="mentor in mentors.mentors" :key="mentor.id" :value="mentor.id">
                {{ mentor.name }}
              </option>
            </select>
          </div>

          <div class="flex justify-end gap-2 mt-4">
            <button type="button" @click="showModal = false" class="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" :style="{ backgroundColor: 'rgba(75, 85, 99, 0.75)' }"
      class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg text-center w-[400px]">
        <h2 class="text-lg font-bold text-red-600">Delete Course</h2>
        <p class="text-gray-700 mt-2">Are you sure you want to delete <strong>{{ selectedCourse?.name }}</strong>?</p>
        <div class="flex justify-center gap-4 mt-4">
          <button @click="showDeleteModal = false" class="px-4 text-gray-700 py-2 border rounded">Cancel</button>
          <button @click="confirmDeleteCourse" class="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCourseStore } from '../store/courseStore';
import { useCategoryStore } from '../store/courseCategoryStore';
import { useMentorStore } from '../store/mentorStore';
import { toast } from 'vue3-toastify';

const store = useCourseStore();
const categoryStore = useCategoryStore();
const mentors = useMentorStore();

const showModal = ref(false);
const showDeleteModal = ref(false);
const selectedCourse = ref(null);
const selectedCategory = ref('All');
const loading = ref(false);

const form = ref({
  id: null,
  name: '',
  categoryId: '',
  mentorId: '',
});

const categories = computed(() => ['All', ...categoryStore.categories.map(cat => cat.name)]);

const filteredCourses = computed(() => {
  if (selectedCategory.value === 'All') return store.courses;
  return store.courses.filter(c => c.CourseCategory?.name === selectedCategory.value);
});

function openAddModal() {
  form.value = {
    id: null,
    name: '',
    categoryId: '',
    mentorId: '',
  };
  showModal.value = true;
}

function editCourse(course) {
  form.value = {
    id: course.id,
    name: course.name,
    categoryId: course.categoryId || course.CourseCategory?.id || '',
    mentorId: course.mentorId || course.Mentor?.id || '',
  };
  showModal.value = true;
}

function openDeleteModal(course) {
  selectedCourse.value = course;
  showDeleteModal.value = true;
}

async function confirmDeleteCourse() {
  if (!selectedCourse.value) return;

  loading.value = true;
  try {
    await store.deleteCourse(selectedCourse.value.id);
    await store.fetchCourses();
    toast.success("Course deleted.");
    selectedCourse.value = null;
    showDeleteModal.value = false;
  } catch (err) {
    toast.error("Failed to delete course.");
  } finally {
    loading.value = false;
  }
}

async function saveCourse() {
  loading.value = true;
  try {
    if (form.value.id) {
      await store.updateCourse(form.value.id, form.value);
      toast.success("Course updated!");
    } else {
      await store.addCourse(form.value);
      toast.success("Course added!");
    }
    await store.fetchCourses();
    showModal.value = false;
  } catch (err) {
    toast.error("Failed to save course.");
  } finally {
    loading.value = false;
  }
}

// Lifecycle
onMounted(async () => {
  await store.fetchCourses();
  await categoryStore.fetchCategories();
  await mentors.fetchMentors();
});
</script>
