provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "main" {
  name     = "aiHackathon2024"
  location = "North Europe"
}

resource "azurerm_container_registry" "main" {
  name                = "aihContainerRegistry"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Basic"
  admin_enabled       = true
}

resource "azurerm_service_plan" "main" {
  name                = "aihServicePlan"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku_name            = "B1"
  os_type             = "Linux"
  
}

resource "azurerm_linux_web_app" "frontend" {
  name                = "aih-frontend"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  service_plan_id     = azurerm_service_plan.main.id

  site_config {
    linux_fx_version = "DOCKER|mycontainerregistry.azurecr.io/aih-frontend:v1"
  }


  app_settings = {
    WEBSITES_PORT = "80"
  }
}

resource "azurerm_linux_web_app" "backend" {
  name                = "aih-backend"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  service_plan_id     = azurerm_service_plan.main.id

  site_config {
    linux_fx_version = "DOCKER|mycontainerregistry.azurecr.io/aih-backend:v1"
  }

  app_settings = {
    WEBSITES_PORT = "8000"
  }
}

output "frontend_url" {
  value = azurerm_web_app.frontend.default_site_hostname
}

output "backend_url" {
  value = azurerm_web_app.backend.default_site_hostname
}
