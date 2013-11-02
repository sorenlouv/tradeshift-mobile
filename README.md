Tradeshift Mobile
=================

Lets be honest - invoicing sucks and no sane person wants to do it. The only reason we still have invoices today is because no one bothered to break out of the restrictions introduced years ago by this legacy format called paper. 
And we're kinda past that now, so lets just move on and we can all forget about the craziness of invoices, credit notes, purchase orders, remittance advice and other concepts we really don't want to take up space in our heads. 

We will be building a mobile first application that automates all the legal requirements around invoicing (using tradeshifts public api), based on sensible, structured human-to-human communication.


Feature set:

- Transactions
	- Outstanding business amount
	- Potential business amount
	- Add update
		- Add product/service
			- Select price
			- Add new price
			- Add discount
			- Add comment
		- Add offer
		- Add expense
			- Take photo, Cloudscan 
			- Price
		- Request product/service
		- Request offer
	- Settle outstanding business
		- Select items to settle
		- Payment due (+14 days, +30 days, + x days)
		- Automated reminders & fees
	- Outstanding business list
		- Update (amount, description, total price inc & excl tax, price pr product excl tax) - (tab to toggle with/without tax prices)
		- Comments
		- Comment
		- Likes / Looks good / Thanks
		- Profile image
	- Add product to my list of products
		- Description
		- Price points
		- Tax %
	- Settled business list 
		- Invoices
		- View invoice
	- Invite

- Contacts
	- List partners using logo
	- Outstanding business amount of each
	- Potential business amount of each
	- Click logo to go to Transactions page
	- Add partner
		- Company name 
		- Auto fetch logo
		- Auto fetch address
		- Persons  (auto fetch images, gravatar)
		- Currency
		- Email
		- Automatically notify customer about updates
	
- Business intelligence
	- Change view
		- Month
		- Quater
		- Year
	- Income & Spend graph + average for view
	- Top partners (income & spend) for view
		- Click to go to Transactions for view
	- New partners (income & spend) for view
		- Click to go to Transactions for view
	- Tax paid in period 
	- Goals
		- Add goal
		- Percentage reached for view
	- Add expense
	- List expenses
		- View expense
	- List invoices
		- View invoice
		- Accounting categorisation 
			- Change accounting categorisation 	
