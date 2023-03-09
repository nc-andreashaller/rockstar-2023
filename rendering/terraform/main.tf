terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "3.46.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rockstar" {
  name     = "rockstar-rg"
  location = "West US"
}

resource "azurerm_storage_account" "rockstar" {
  name                     = "rockstarsa"
  resource_group_name      = azurerm_resource_group.rockstar.name
  location                 = azurerm_resource_group.rockstar.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_service_plan" "rockstar" {
  name                = "azure-functions-rockstar-service-plan"
  location            = azurerm_resource_group.rockstar.location
  resource_group_name = azurerm_resource_group.rockstar.name
  sku_name            = "Y1"
  os_type             = "Linux"
}

resource "azurerm_linux_function_app" "rockstar" {
  name                = "rockstar-ssr-function-app"
  resource_group_name = azurerm_resource_group.rockstar.name
  location            = azurerm_resource_group.rockstar.location

  https_only          = true

  storage_account_name       = azurerm_storage_account.rockstar.name
  storage_account_access_key = azurerm_storage_account.rockstar.primary_access_key
  service_plan_id            = azurerm_service_plan.rockstar.id

  site_config {}
}
