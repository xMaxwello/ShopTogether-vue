<script setup lang="ts">
import { IonContent, IonPage, IonIcon, IonActionSheet } from '@ionic/vue';
import GroupCard from "@/compontents/GroupCard.vue";
import NewGroupDialog from "@/compontents/NewGroupDialog.vue";
import router from "@/router";
import { add, trash } from "ionicons/icons";
import { ref, onMounted } from 'vue';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '@/../firebaseConfig';

const groups = ref([]);
const showDialog = ref(false);
const showActionSheet = ref(false);
const selectedGroupId = ref(null);

const fetchGroups = async () => {
  const querySnapshot = await getDocs(collection(db, 'groups'));
  groups.value = await Promise.all(querySnapshot.docs.map(async doc => {
    const groupData = doc.data();
    const itemsSnapshot = await getDocs(collection(db, 'groups', doc.id, 'products'));
    return {
      id: doc.id,
      ...groupData,
      itemsCount: itemsSnapshot.size // Fetch and count the items in each group
    };
  }));
};

onMounted(fetchGroups);

const goToList = (groupId) => {
  router.push(`/shoppinglist/${groupId}`);
};

const openDialog = () => {
  showDialog.value = true;
};

const closeDialog = () => {
  showDialog.value = false;
};

const createGroup = async (groupName) => {
  const user = auth.currentUser;
  if (!user) return;

  const groupData = {
    groupName,
    groupId: '', // Will be set by Firestore
    products: [],
    userOwnerUUID: user.uid,
    userUUIDs: [user.uid]
  };

  try {
    const docRef = await addDoc(collection(db, 'groups'), groupData);
    await updateDoc(docRef, { groupId: docRef.id });
    groupData.groupId = docRef.id;
    groups.value.push({ ...groupData, itemsCount: 0 }); // Add new group with initial items count of 0
    closeDialog();
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const showDeleteActionSheet = (groupId) => {
  selectedGroupId.value = groupId;
  showActionSheet.value = true;
};

const deleteGroup = async () => {
  if (!selectedGroupId.value) return;

  try {
    await deleteDoc(doc(db, 'groups', selectedGroupId.value));
    groups.value = groups.value.filter(group => group.id !== selectedGroupId.value);
    showActionSheet.value = false;
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="w-full h-full px-4 bg-white flex flex-col items-center">
        <h1 class="text-black text-[32px] py-10">Gruppen</h1>
        <div v-for="group in groups" :key="group.id" class="w-full">
          <GroupCard :groupName="group.groupName" :membersCount="group.userUUIDs.length" :itemsCount="group.itemsCount" :groupId="group.id" @longpress="showDeleteActionSheet" @click="goToList(group.id)" />
        </div>

        <ion-fab slot="fixed" vertical="bottom" horizontal="end">
          <ion-fab-button @click="openDialog">
            <ion-icon :icon="add"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      </div>

      <NewGroupDialog v-if="showDialog" @close="closeDialog" @createGroup="createGroup" />

      <ion-action-sheet
          :is-open="showActionSheet"
          @didDismiss="showActionSheet = false"
          :buttons="[
          {
            text: 'Delete Group',
            role: 'destructive',
            icon: trash,
            handler: deleteGroup
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]"
      ></ion-action-sheet>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.dialog-card {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
