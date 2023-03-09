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

resource "azurerm_static_site" "rockstar" {
  name                = "rockstar-swa"
  resource_group_name = azurerm_resource_group.rockstar.name
  location            = "westus2"
}
