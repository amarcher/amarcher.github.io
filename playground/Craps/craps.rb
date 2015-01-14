require_relative "bet"
require_relative "crapsdie"

class CrapsGame
  attr_reader :bankroll, :point, :unresolved_bets, :prev_roll

  def initialize(bankroll)
    @bankroll = bankroll
    @point = nil
    @unresolved_bets = []
    @prev_roll = Array.new(2)
  end

  def roll
    @prev_roll = Array.new(2) { CrapsDie.new.roll }
    puts "You rolled *#{@prev_roll[0]}* and *#{@prev_roll[1]}* for a total of **#{ @prev_roll[0] + @prev_roll[1] }**"
    resolve_bets
    determine_point
  end

  def bet(type, amount)
    name = type.intern
    raise ArgumentError, "There's no such bet as #{type}!" if (! BETS[name])
    @unresolved_bets << Bet.new(name, amount, @point)
    @bankroll -= amount
  end

  def walk_away
    @unresolved_bets.each {|bet| @bankroll += bet.payout_on_take_down}
  end

  private

  def resolve_bets
    @unresolved_bets.each { |bet| resolve_bet(bet) }
    @unresolved_bets.delete_if { |bet| bet.resolved? }
  end

  def resolve_bet(bet)
    @bankroll += bet.payout_on_roll(@prev_roll)
  end

  def determine_point
    roll_total = @prev_roll[0] + @prev_roll[1]
    if (! @point) && [4,5,6,8,9,10].include?(roll_total)
      @point = roll_total
      @unresolved_bets.each { |bet| bet.change_for_point(@point) }
      puts "#{ @point } is the point! Place your bets!"
    elsif roll_total == @point || (@point && roll_total == 7) # point hit or seven rolled
      @point = nil
      puts "Coming out! Place your bets!"
    end
  end
end