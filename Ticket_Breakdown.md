# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.


## Breakdown

### Ticket 1: Add custom id field to Agents table
#### Description:
Add a new "custom_id" field to the Agents table to allow Facilities to save their own custom ids for each Agent they work with, and migrate existing data.

#### Acceptance Criteria:

1. A new "custom_id" field is added to the Agents table in the database.
2. The new field can be updated and queried through the API. 
3. The new custom id field in the Agents table is not nullable and has a maximum length of 50 characters 
4. The default value for the custom id is the same as the internal database id for existing Agents.
5. The custom_id field is updated for all existing Agents in the database, with the custom id value set to the same as the internal database id by default. 
6. The migration script does not affect other tables in the database. 
7. The migrated data is consistent and accurate. 
8. Updated records appear with the new custom_id field in the API responses and user interfaces.


#### Implementation Details:

- Create a new migration to add the "custom_id" field to the Agents table in the database.
- Update the Agents API to accept and return the custom_id field in all relevant endpoints.
- Update the database schema.
- Create a data migration script to set the custom_id value for all existing Agents to the same as the internal database id by default. 
- Test the migration script to ensure that data is updated correctly and no unintended consequences occur. 
- Update the existing test suite to ensure that migrated data appears with the new custom_id field in the API responses and user interfaces.

Effort Estimate: **6 hours**



### Ticket 2: Update the Agent creation/edit form to include the custom id field

#### Acceptance criteria:
1. The new custom id field is displayed prominently in the Agent creation/edit form.
2. The custom id field is validated to ensure it meets any necessary requirements (e.g. maximum length, uniqueness, etc.).
3. Facilities can successfully save a custom id for each Agent through the form.
4. New Agents created through the Agent creation form have a blank custom_id by default.
5. The custom_id field is editable through the Agent edit form.

#### Implementation details:
- Add the new custom id input field to the Agent creation/edit form.
- Use client-side validation to ensure that the custom id is not blank and meets any necessary requirements (e.g. maximum length, uniqueness, etc.).
- Use server-side validation to ensure that the custom id is not already in use by another Agent and meets any necessary requirements.
- Integrate new custom id field from the Agents API for any create or update requests.
- Add an option to update the custom_id field in the Agent edit form.

Effort Estimate: **5 hours**



### Ticket 3: Update getShiftsByFacility to use custom ids
#### Description:
Update the getShiftsByFacility function to include the custom_id field from the Agents table in the returned metadata.

#### Acceptance Criteria:

1. The getShiftsByFacility function is updated to include the custom_id field from the Agents table in the returned metadata.
2. The API documentation is updated to reflect the addition of the custom_id field.
3. Update any other functions or code that relies on the shift metadata to handle the custom id field appropriately.

#### Implementation Details:

- Update the API documentation to include information about the new custom_id field in the metadata.
- Update the getShiftsByFacility function to include a join on the Agents table to retrieve the custom_id field.
- Modify the SQL query used by the getShiftsByFacility function to retrieve the custom id for each Agent.
- Update unit and integration tests.
- Modify any internal code that is reliant on the existing getShiftsByFacility metadata response (E2E tests, contract tests etc.).

Effort Estimate: **4 hours**



### Ticket 4: Update generateReport to use custom ids
#### Description:
Update the generateReport function to use the custom_id field from the Agents table in the generated report.

#### Acceptance Criteria:

1. The generateReport function is updated to use the custom_id field from the Agents table in the generated report.
2. The API documentation is updated to reflect the addition of the custom_id field.
3. Update any other functions or code that relies on the shift metadata to handle the custom id field appropriately.

#### Implementation Details:

- Update the generateReport function to use the custom_id field in place of the existing internal id field.
- Update internal types or interfaces leveraged by PDF conversion software.
- Update unit and integration tests.
- Update the API documentation to include information about the new custom_id field in the generated report.

Effort Estimate: **4 hours**



### Ticket 5: Update platform UI to display custom ids in reports
#### Description:
Update the platform UI to display the custom id for each Agent in generated reports.

#### Acceptance Criteria:

1. The UI is updated to display the custom id for each Agent in generated reports.
2. The custom id is displayed in a prominent and easy-to-read location, in close proximity to the internal database id.
3. Reports generated both before and after the custom id feature was added display both the internal database id and custom id.
4. If no custom id is set for an Agent, the internal database id is displayed instead.

#### Implementation Details:

- Identify the appropriate location to display custom ids in generated reports
- Modify the PDF generation code to include the custom id in the report
- If no custom id is set for an Agent, include the internal database id instead
- Ensure that reports generated before the custom id feature was added are not affected and still display the internal database id.
- Update the relevant UI components to display both the internal database id and custom id in a clear and easy-to-read manner.
- Update any tests that rely on the UI to reflect changes to the custom id feature.

Effort Estimate: **4 hours**
