const cds = require("@sap/cds");
const businessPartnerService = require("../services/business-partner-service/service");

module.exports = (srv) => {
  const { BusinessPartners, BusinessPartnerAddress } = srv.entities;

  srv.on("READ", BusinessPartners, async (req, next) => {
    const { businessPartnerApi } =
      businessPartnerService.businessPartnerService();

    return await businessPartnerApi
      .requestBuilder()
      .getAll()
      .select(
        businessPartnerApi.schema.BUSINESS_PARTNER,
        businessPartnerApi.schema.FIRST_NAME,
        businessPartnerApi.schema.LAST_NAME,
        businessPartnerApi.schema.BUSINESS_PARTNER_CATEGORY
      )
      .filter(
        businessPartnerApi.schema.FIRST_NAME.notEquals(""),
        businessPartnerApi.schema.LAST_NAME.notEquals("")
      )
      .top(10)
      .addCustomHeaders({ apikey: process.env.apikey })
      .execute({
        url: process.env.URL,
      });
  });

  srv.on("READ", BusinessPartnerAddress, async () => {
    const { businessPartnerAddressApi } =
      businessPartnerService.businessPartnerService();

    return await businessPartnerAddressApi
      .requestBuilder()
      .getAll()
      .select(
        businessPartnerAddressApi.schema.BUSINESS_PARTNER,
        businessPartnerAddressApi.schema.ADDRESS_ID,
        businessPartnerAddressApi.schema.POSTAL_CODE,
        businessPartnerAddressApi.schema.CITY_NAME,
        businessPartnerAddressApi.schema.STREET_NAME,
        businessPartnerAddressApi.schema.HOUSE_NUMBER
      )
      .top(10)
      .addCustomHeaders({ apikey: process.env.apikey })
      .execute({
        url: process.env.URL,
      });
  });
};
