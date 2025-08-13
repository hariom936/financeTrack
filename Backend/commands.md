typeorm migration:run -- -d src/migration
npm run typeorm migration:generate -- -n test

typeorm migration:create path-to-migrations-dir/migrationName

typeorm migration:create src/migration/customers

typeorm entity:create path-to-entity-dir/entity

typeorm entity:create src/entity/customers

typeorm migration:show -- -d path-to-datasource-config

typeorm schema:sync
typeorm schema:log
typeorm schema:drop -- -d path-to-datasource-config
typeorm query "SELECT \* FROM USERS"

npm install typeorm-seeding

ref - https://typeorm.io/using-cli#generate-a-migration-from-existing-table-schema

http://localhost:8000/images/23.png
http://localhost:8000/images/25566.png

id- customer - > delete - > isDeleted - < check ---> rewards , loyality point wallet ,

next time -- > customer with same number but diff - > primarykey

dashboard ----- >

-< user> <deleted user>
delted user  
step 1) we will introduce two new column isDeleted (boolean)and deletedAt(timeStamp) -> pk 1
step 2) will introuce one more table deleted_log userID , deleteAt ,

start  system
Define malls and their tiers -> all tiers
Define parent mall assignment criteria - > first bill upload -> parent mall
Define rules for point allocation - > at the time of tier allocation from admin
Define membership duration and grace period -> membership duration 6 month on code level

case 1 -
Function SignUp(user) if this case match user will come in accural tier state
user.parent_mall = NULL
user.tier = NULL
user.points = 0

case 2
when user upload first bill
Function UploadFirstBill(user, bill)
If user.parent_mall is NULL:
Assign user.parent_mall based on bill.mall
Calculate user.tier based on bill.amount - > if user in accural then we will caluculate point from its parent tier
Assign membership start date as bill.upload_date
Assign membership end date as start date + 6 months
Notify user tier as per the amount he spend 

Function UploadBill(user, bill)    we will reject the bill if user upload after 7 days
If bill.upload_date > 7 days from current date:
Reject bill
Notify user of rejection
Return

If bill.mall != user.parent_mall:
Allocate points based on bill.mall tier
Else:
Calculate tier based on last 6 months bill total
If tier changes:
Notify user of tier change
If upgrading tier:
Update membership start date as bill.upload_date
Update membership end date as start date + 6 months
Apply new benefits immediately
Else if downgrading tier:
Apply current tier benefits until end date
Downgrade tier at end date
Allocate points based on current tier

If user in grace period:
EvaluateTierDuringGracePeriod(user, bill)

Function EvaluateTierDuringGracePeriod(user, bill)
If user is in grace period:



Function EndMembership(user)   - > ?????????? 
  Calculate total bill amount from membership start date to end date
  Evaluate tier based on total amount
  If user qualifies for a tier:
    Update tier and membership dates
  Else:
    Move user to Accrual stage
    Set accrual start and end date

Function EndGracePeriod(user)   - > next three month but all the dicosunt will be calculate as per his prevous tier 
  Calculate total bill amount from grace period start to end date
  Evaluate tier based on total amount
  If user qualifies for a tier:
    Update tier and membership dates
  Else:
    Move user to Accrual stage



Function CalculateTier(user, bill_amount)
  If bill_amount between 50,000 and 1,50,000:
    return "Tier 1"
  Else if bill_amount between 1,50,001 and 2,50,000:
    return "Tier 2"
  Else if bill_amount > 2,50,001:
    return "Tier 3"
  Else:
    return "Accrual"

Function AllocatePoints(user, bill, tier)
  If tier is "Tier 1":
    user.points += bill.amount * 0.05
  Else if tier is "Tier 2":
    user.points += bill.amount * 0.07
  Else if tier is "Tier 3":
    user.points += bill.amount * 0.10
  Else:
    user.points += bill.amount * 0.05

Function DowngradeTier(user)
  If user is currently in a tier:
    Move user to lower tier or Accrual stage
    NotifyUser(user, "Downgraded to " + user.tier)

Function UpgradeTier(user)
  If user is eligible for a higher tier:
    Move user to higher tier
    NotifyUser(user, "Upgraded to " + user.tier)

