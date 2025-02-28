<template>
    <v-app-bar class="header">
      <NuxtLink to="/" class="d-flex align-center link-no-style mr-3">
        <v-img src="/fcr-favicon-color.png" class="fcr-image" cover/>
        <h3 class="fcr-title"></h3>
      </NuxtLink>
      <v-list class="d-md-flex hidden-sm-and-down">
        <v-list-item><v-btn to="/products" text>Products</v-btn></v-list-item>
        <v-list-item><v-btn to="/company" text>Company</v-btn></v-list-item>
      </v-list>
      <ClientOnly fallback-tag="span" fallback="">
        <v-spacer class="hidden-md-and-up"></v-spacer>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn class="hidden-md-and-up" icon v-bind="props"><v-icon icon="mdi-menu" /></v-btn>
          </template> 
          <v-sheet rounded="md" width="220" elevation="12">
            <v-list>
              <v-list-item to="/products">Products</v-list-item>
              <v-list-item to="/company">Company</v-list-item>
            </v-list>
          </v-sheet>
        </v-menu>
      </ClientOnly>
    </v-app-bar>
  </template>
  
  <style lang="scss" scoped>
  .fcr-image {
    height: 50px;
    width: 100px;
  }
  .header {
    width: 100%;
  }
  </style>