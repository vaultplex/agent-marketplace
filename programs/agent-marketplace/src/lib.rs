use anchor_lang::prelude::*;

declare_id!("AYeE7ugAUsoWHh25UZZewBEWMie5xJoaEBuK7zjNEyT3");

#[program]
pub mod agent_marketplace {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
